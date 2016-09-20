'use strict';

module.exports = function(req, callback) {
  console.log('req.body: ', req.body);
  req.body = '';
  req.on('data', function(data){
    req.body += data.toString();
  });
  req.on('end', function(){
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
