import { pino } from 'pino';

import { config } from '../config';

const transport = config.env.isTest
  ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  }
  : undefined;

export const logger = pino({
  level: config.logging.logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: transport,
});
