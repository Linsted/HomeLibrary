import { join } from 'path';
import { createLogger, format, transports } from 'winston';

import { levelEmojis } from 'src/common/constants/logger';

const LOGS_PATH = join(__dirname, '..', '..', 'src', 'logs');

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  const emoji = levelEmojis[level] || '';
  return `${timestamp} - [${level.toUpperCase()}] - ${emoji} ${
    stack || message
  }`;
});

const options = {
  console: {
    level: 'silly',
  },
};

// for development environment
const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
    format.colorize({ all: true }),
  ),
  transports: [new transports.Console(options.console)],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: `error.log`,
      dirname: LOGS_PATH,
      level: 'error',
    }).on('error', (err) => {
      console.error('Error writing to error.log:', err);
    }),
    new transports.File({
      filename: 'combine.log',
      dirname: LOGS_PATH,
      level: 'info',
    }).on('error', (err) => {
      console.error('Error writing to combine.log:', err);
    }),
  ],
};

const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
