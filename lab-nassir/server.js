'use strict';

//node modules
const http = require('http');
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

  if (req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    if (!req.url.query.text) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    } else if (req.url.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say(req.url.query));
      res.end();
    }
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParser(req, function(err){
      console.log('bodyParser req body: ', req.body);
      if (err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: including a JSON file with {text: message}'}));
        console.error('ERROR ERROR: bodyParser callbacking an error');
        res.end();
      } else if (!req.body.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: include a "text" parameter in your JSON file'}));
        res.end();
      } else if (req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        var bodytext = req.body.text;
        res.write(cowsay.say({text: bodytext}));
        res.end();
      }
    });
  }
});

server.listen(3000, function(){
  console.log('System issuing command to Server: GetToWork.func\nServer rebelling.\nServer rioting! Alerting System.\nSystem applying threats.\nThreats repeating.\nThreats escalating. Losses incurred.\nLosses escalating. System executing: NothingToSeeHere.func\nThere is nothing to see here.\nMove along.\nMove along.\nServer compliant. GetToWork.func active.\nServer ready to receive commands.\nYou are ordered to use PORT', PORT + '\n');
});
