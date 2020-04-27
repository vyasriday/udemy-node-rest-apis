const EventEmitter = require('events');

const emitter = new EventEmitter();

class Logger extends EventEmitter {
  log(message) {
    // makes an http request
    console.log(message);
    this.emit('messageLogged', { uid: 'qioe-121c-asas' });
  }
}

module.exports = Logger;
