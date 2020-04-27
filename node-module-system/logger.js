const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

const emitter = new EventEmitter();
// emitter.on('logging', (arg) => console.log(arg));

function log(message) {
  // Send HTTP Request
  emitter.emit('logging', { userId: '21212' });
}

// module.exports is an object which is exported from this module. Whatever is added to that object is available outside
module.exports.log = log;
// module.exports.url = url;
