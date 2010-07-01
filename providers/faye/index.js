var Faye = require('./faye-node');

module.exports = {
  setup: function (env) {
    this.adapter = new Faye.NodeAdapter({mount: this.mount});
  },
  handle: function (req, res, next) {
    if (!this.adapter.call(req, res)) {
      next();
    }
  }
};
