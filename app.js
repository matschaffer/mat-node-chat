var sys  = require('sys');

module.exports = new require('./lib/connect').createServer([
  {filter: 'log'},
  {module: require('./providers/faye')},
  {provider: "static", root: "./public"}
]);
