var sys  = require('sys'),
    http = require('http'),
    url  = require('url'),
    util = require('./util'),
    port = parseInt(process.env.PORT || 8000);

// db url is at process.env.DATABASE_URL

http.createServer(function (req, res) {
  res.simpleJSON = function (code, obj) {
    var body = JSON.stringify(obj);
    res.writeHead(code, {
      'Content-Type': 'text/json',
      'Content-Length': body.length
    });
    res.write(body)
    res.end();
  };

  (util.getMap[url.parse(req.url).pathname] || util.notFound)(req, res);
}).listen(port);

sys.puts('Server running at http://*:' + port);
