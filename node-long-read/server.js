'use strict';

const http = require('http');
const url = require('url');

function start(route, handle) {

  function onRequest(req, res){
    let pathName = url.parse(req.url).pathname;
    console.log('Req for ' + pathName + 'req\'d');
    route(handle, pathName, res, req);
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has BEGUN');
}

exports.start = start;
