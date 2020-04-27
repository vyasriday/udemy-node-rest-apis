const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World!');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', () => console.log('server up and running'));

server.listen(4000);
console.log(`Listening on port 4000`);
// const Logger = require('./logger');

// const logger = new Logger();

// // now we are adding a listener and emitting an event on the same emitter instance which is encapsulated inside Logger class
// logger.on('messageLogged', (uid) => {
//   console.log('Message Logged', uid);
// });

// logger.log('message');
