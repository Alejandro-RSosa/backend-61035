import winston from 'winston';
import 'dotenv/config';

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
  },
  colors: {
    debug: 'blue',
    http: 'magenta',
    info: 'green',
    warning: 'yellow',
    error: 'red',
    fatal: 'red'
  }
};

winston.addColors(customLevels.colors);

// DESARROLLO
const devLogger = winston.createLogger({
  levels: customLevels.levels,
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// PRODUCCION
const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './errors.log', level: 'error' })
  ]
});


const logger = process.env.LOGGER === 'production' ? prodLogger : devLogger;

logger.debug('Debug message');
logger.http('HTTP message');
logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');
logger.fatal('Fatal message');

export default logger;