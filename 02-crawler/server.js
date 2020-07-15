#!/usr/bin/env node

const http = require('http'),
      log  = console.log;

http.createServer((req, res) => {
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');

  var body = '';

  req.on('data', function(chunk) { body += chunk; });
  req.on('end', function() {
    log(body);
    
    res.end('OK!');
  });
}).listen(8080);
