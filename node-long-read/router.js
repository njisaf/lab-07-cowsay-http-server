'use strict';

function route(handle, pathname, res, req) {
  console.log('Routing a request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](res, req);
  } else {
    console.log('No request handler found for ' + pathname);
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
}

exports.route = route;
