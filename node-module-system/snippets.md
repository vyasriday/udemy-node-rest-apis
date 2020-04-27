### Notes for this module

##### Using EventEmitter to emit and listen to events

Note: In order for EventEmitter to work properly it is mandatory that you add the listener and emit event on the same instance of of the Event Emitter. By extending EventEmitter class here we are creating the same instance of EventEmitter everytime Logger instance is created and hence we can add Listener from anywhere in out code on to `messageLoaded` event.
logger.js
```javascript
const EventEmitter = require('events')

class Logger extends EventEmitter {

  log(message) {
    console.log(message)
    // now we want to emit and event which can be listened to anywhere in the code
    this.emit('messageLogged', {uid: 1})
  }
}

module.exports = Logger
```

app.js
```javascript
const Logger = require('./logger')

const logger = new Logger()

// now here we want to register an event listener that will listen to messageLogged event

logger.on('messageLogged', (uid) => console.log(uid))

logger.log()
```