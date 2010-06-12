var sys = require('sys'),
    http = require('http'),
    fs = require('fs'),
    port = parseInt(process.env.PORT || 8000);

http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
        if (err) {
          sys.puts('Error loading file.');
        } else {
          sys.puts('Loading file.');
        }

        res.writeHead(200, {
          'Content-Type':   'text/html',
          'Content-Length': data.length
        });
        res.write(data);
        res.close();
      });
}).listen(port);

sys.puts('Server running at http://*:' + port);
