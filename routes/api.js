/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

var ObjectId = require('mongodb').ObjectID;



module.exports = function (app, db){


    app.route('/api/issues/:project')

      .get(function (req, res){
        var project = req.params.project;
        let objFind = {};
        for (let prop in req.query) {
          if(prop == '_id') {
            if(!ObjectId.isValid(req.query[prop]|| req.query[prop]==''))
              return res.send('invalid id');           
            else
              objFind._id = ObjectId(req.query._id); 
            }
          else            
            if (prop == 'open')
              objFind[prop] = (req.query[prop] == "true");
            else
              objFind[prop] = req.query[prop];
            
        }

        db.collection(project).find(objFind).toArray((err, data) => {
           if(err) {
            console.log(err+' Error occurred while find');
           }
          return res.send(data);          
        });
      })

      .post(function (req, res){
        var project = req.params.project;
        if(req.body.issue_title == "" ||
           req.body.issue_text == "" ||
           req.body.created_by == ""  )
          return res.send("missing inputs");
        const issue = 
        {
          issue_title: req.body.issue_title,
          issue_text: req.body.issue_text,
          created_by: req.body.created_by,
          assigned_to: req.body.assigned_to,
          status_text: req.body.status_text,
          created_on: new Date().toString(),
          updated_on: new Date().toString(),
          open: true
        }
        db.collection(project).insert(issue,
        (err, resp) => {
           if(err) {
            console.log(err+' Error occurred while inserting');
           }
          return res.json(resp.ops[0]);
        });
      
      })
      .put(function (req, res){
        var project = req.params.project;

          
        let objUpdate = {};
        for (let prop in  req.body){
          if(prop != "_id" && prop != "open") 
            if (req.body[prop]) objUpdate[prop] = req.body[prop];
          if(prop == "open") objUpdate[prop] = !req.body[prop];

        }

        if(!ObjectId.isValid(req.body._id) || req.body._id == '')
          return res.send('no updated field sent');  
       /* if(Object.keys(objUpdate).length === 0)
          return res.send('no updated field sent');*/
        objUpdate.updated_on = new Date().toString()

        db.collection(project).updateOne(
        { _id: ObjectId(req.body._id)},
          {$set: objUpdate
 
        },(err, resp) => {
            if(err) {
            console.log(err+' Error occurred while updating');
              return res.send( 'could not update ' + req.body._id);
           }
            return res.send('successfully updated');
        });
      })

      .delete(function (req, res){
        var project = req.params.project;
      if(!ObjectId.isValid(req.body._id)|| req.body._id == '')
        return res.send('invalid id');
        db.collection(project).remove({_id: ObjectId(req.body._id)},(err,resp) => {
           if(err) {
            console.log(err+' Error occurred while deleting');
            return res.send( 'failed: could not delete ' + req.body._id);
           }  
          if (resp.result.n === 0)
            return res.send('failed: could not delete ' + req.body._id);
          
          return res.send( 'deleted ' + req.body._id);          
        });
      });

 
};