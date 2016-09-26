'use strict';

const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

function start(res) {
  console.log('Request handler \'start\' was called...');

  let body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';

  res.writeHead(200, {'Content-type': 'text/plain'});
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('Request handler \'upload\' was called...');

  let form = formidable.IncomingForm();
  console.log('Preparing to parse...');
  form.parse(req, function(err, fields, files){
    console.log('Parsing complete!');
    fs.rename(files.upload.path, '/tmp/test.png', function(err){
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });
  });

  res.writeHead(200, {'Content-type': 'text/plain'});
  res.write('Received image:<br/>');
  res.write('<img src=\'/show\' />');
  res.end();
}

function show(res) {
  console.log('Request handler \'show\' was called...');
  res.writeHead(200, {'Content-type': 'text/plain'});
  fs.createStream('/tmp/test.png').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
