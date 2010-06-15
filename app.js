var sys = require('sys'),
    app;

app = function(req, res) {
  var data = "hello connect";
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": data.length
  });
  res.end(data);
};

module.exports = new require('./lib/connect').createServer([
  { filter: 'log' },
  { module: { handle: app } }
]);
