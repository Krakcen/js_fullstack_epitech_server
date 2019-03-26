<<<<<<< HEAD
/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on http://${app.get('host')}:${port}`)
);


// RateLimit, il8n. 
=======
const logger = require('./logger');
const app = require('./server');
const port = app.get('port');

const server = app.listen(port);
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Rejection at: Promise ${p} ${reason}`/*, p, reason*/);
});

server.on('listening', () =>
  logger.info('started on ' + 'http'.yellow + ':'.red + `//${app.get('host')}`.yellow + ':'.red + `${port}`.blue)
);
>>>>>>> ccc4efa52f00cf1eda6a05bae6f70cac3a98bd4a
