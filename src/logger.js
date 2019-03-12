const config = require('config');
const colorsConsole = require('colors');
const { createLogger, format, transports } = require('winston');
const { timestamp, printf, label, colorize, json, prettyPrint } = format;



const formatConsole = printf(({ level, message, label }) => {
  return `[📚 : ${label}] `.blue + `${level}`.underline + ` : ${message}`;
});

const formatFichier = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message} `;
});

const fichier = new transports.File({
  filename: '../logs/apilog.log',
  format: format.combine(
    timestamp(),
    formatFichier
  )
});

const console = new transports.Console({
  format: format.combine(
    colorize(),
    json(),
    label({ label: config.get('title') }),
    prettyPrint(),
    formatConsole,
  )
});

const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  exitOnError: true
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(console);
} else {
  logger.add(fichier);
}

module.exports = logger;
