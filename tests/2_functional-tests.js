/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
let idtest;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          idtest= res.body._id;
          //fill me in too!
          assert.equal(res.body.issue_title,'Title');
          assert.equal(res.body.issue_text,'text');
          assert.equal(res.body.created_by,'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to,'Chai and Mocha');
          assert.equal(res.body.status_text,'In QA');
          assert.equal(res.body.open, true);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');         
          done();
        });
      });
      test('Required fields filled in', function(done) {
      chai.request(server).post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every required field filled in',
          status_text: '',
          assigned_to: ''
          })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_by');
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.open, true);
          assert.equal(res.body.created_by, 'Functional Test - Every required field filled in');
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'status_text');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');        
        done();
        });
      });

      test('Missing required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'text',
          issue_text: 'hello',
          created_by: '',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
        console.log('Missing');
          console.log(res.text);
          assert.equal(res.text,'missing inputs'); 
          done(); 
        });
      
      });
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      test('No body', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.equal(res.status, 200);  
        console.log(res.text);
          assert.equal(res.text,'no updated field sent');
          done();
        });
      });
      
      test('One field to update', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
        _id : idtest,
        issue_text: 'text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);      
          assert.equal(res.text,'successfully updated');
          done();
        });        
      });
      
      test('Multiple fields to update', function(done) {
       chai.request(server)
        .put('/api/issues/test')
        .send({
        _id : idtest,
        issue_text: 'text',
        created_by: 'Functional Test - Multiple fields updte',
        assigned_to: 'Pocholo',
        issue_text: 'text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);      
          assert.equal(res.text,'successfully updated');
          done();
        });             
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test?issue_title=Title')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.equal(res.body[0].issue_title,'Title');
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
       chai.request(server)
       // .get('/api/issues/test?issue_title=Title&open=true')
        .get('/api/issues/test?_id='+idtest+'&open=true')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.equal(res.body[0].issue_title,'Title');
          assert.property(res.body[0], 'open');
          assert.equal(res.body[0].open,true);
           assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });          
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
       chai.request(server)
        .delete('/api/issues/apitest')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text,'invalid id');
         done();
        });                  
      });

      
      test('Valid _id', function(done) {
        let queryObj ={_id: idtest};
       chai.request(server)
        .delete('/api/issues/test')
        .send(queryObj)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text,'deleted ' + idtest);
          done();
        });         
      });
      
    });

});
