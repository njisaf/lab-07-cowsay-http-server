'use strict';

//node modules
const fs = require('fs');
const http = require()
const querystring = require('querystring');
const url = require('url');
//npm modules
const cowsay = require('cowsay');
//app modules
const bodyParser = require('./lib/body-parser');
//env variables
const PORT = process.env.PORT || 3000;
//module constants
//module logic

const server = http.createServer(function(req, res){

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.url.query', req.url.query);
  console.log('req.query', req.query);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);


  if(req.method === 'GET') {
    console.log('method is GET');
  }

  if(req.method === 'POST') {
    bodyParser(req, function(err){
      if (err) return console.error('ERROR ERROR: bodyParser callbacking an error');
      console.log('bodyParser req body', req.body);
      res.write(cowsay.say(req.body));
    });
  }
});

server.listen(3000, function(){
  console.log('System issuing command to Server: GetToWork.func\nServer rebelling.\nServer rioting! Alerting System.\nSystem applying threats.\nThreats repeating.\nThreats escalating. Losses incurred.\nLosses escalating. System executing: NothingToSeeHere.func\nThere is nothing to see here.\nMove along.\nMove along.\nServer compliant. GetToWork.func active.\nServer ready to receive commands.\n', PORT);
});
