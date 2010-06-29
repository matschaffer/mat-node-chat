var sys  = require('sys'),
    Faye = require('./faye-node'),
    adapter = new Faye.NodeAdapter();

function handleFaye(request, response, next) {
  if (!adapter.call(request, response)) {
    next();
  }
}

module.exports = new require('./lib/connect').createServer([
  {filter: 'log'},
  {module: { handle: handleFaye } },
  {provider: "static", root: "./public"}
]);
