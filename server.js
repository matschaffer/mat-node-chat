var sys = require('sys'),
    http = require('http'),
    port = parseInt(process.env.PORT || 8000);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from heroku\n');
}).listen(port);

sys.puts('Server running at http://*:' + port);
