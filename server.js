var sys = require('sys');

sys.puts("Node version is " + process.version);
sys.puts("Env details are " + sys.inspect(process.env));

require('./app').listen(parseInt(process.env.PORT) || 3000);
// db url is at process.env.DATABASE_URL
