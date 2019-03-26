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
