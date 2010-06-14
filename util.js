var sys = require('sys'),
    fs  = require('fs'),
    qs  = require('querystring'),
    url = require('url'),
    util = exports;

util.getMap = [];

util.sessions = {};

util.createSession = function (nick) {
  var i, session;

  for (i in util.sessions) {
    session = util.sessions[i];
    if (session && session.nick === nick) {
      return null;
    }
  }

  session = {
    nick: nick,
    id: Math.floor(Math.random() * 999999999999).toString()
  };

  util.sessions[session.id] = session;
  return session;
};

util.get = function(path, handler) {
  util.getMap[path] = handler;
};

util.notFound = function(req, res) {
  var message = 'Not found';

  res.writeHead(404, {
      'Content-Type': 'text/plain',
      'Content-Length': message.length
    });
  res.write(message);
  res.end();
};

util.staticHandler = function(filename) {
  var body;

  function loadResponseData(callback) {
    fs.readFile(filename, function(err, data) {
      if (err) {
        sys.debug('Error loading file ' + filename);
      } else {
        sys.debug('loading file ' + filename);
        body = data;
      }
      callback();
    });
  }

  return function(req, res) {
    loadResponseData(function() {
      res.writeHead(200, {
        'Content-Type': 'text.html',
        'Content-Length': body.length,
      });
      res.write(body);
      res.end();
    });
  };
};

util.get('/', util.staticHandler('index.html'));
util.get('/jquery-1.4.2.js', util.staticHandler('jquery-1.4.2.js'));
util.get('/client.js', util.staticHandler('client.js'));

util.get('/join', function (req, res) {
    var nick = qs.parse(url.parse(req.url).query).nick,
        session = util.createSession(nick);

    if (!session) {
      res.simpleJSON(200, { error: 'Nick in use' });
      return;
    } 
    res.simpleJSON(200, session);
  });
