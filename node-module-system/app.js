const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');
const logger = require('./logger');
// let pathObj = path.parse(__filename);

// console.log(
//   fs.readdir(__dirname, 'utf8', (err, rs) => {
//     console.log(err, rs);
//   })
// );

// console.log(pathObj);
// console.log(os.freemem());
// console.log(os.totalmem());

// console.log(http)

const emitter = new EventEmitter();

// emitter.on('messageLogged', (event) =>
//   console.log('listened to the event', event)
// );

// emitter.emit('messageLogged', { id: 1, name: 'Database Error' });

logger.log();
