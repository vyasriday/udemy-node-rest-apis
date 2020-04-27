const Logger = require('./logger');

const logger = new Logger();

// now we are adding a listener and emitting an event on the same emitter instance which is encapsulated inside Logger class
logger.on('messageLogged', (uid) => {
  console.log('Message Logged', uid);
});

logger.log('message');
