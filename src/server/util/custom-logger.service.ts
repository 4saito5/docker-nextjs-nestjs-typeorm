import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

export class CustomLoggerService implements LoggerService {
  logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: process.env.LOG_LEVEL,
      format: format.combine(
        // format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()),
      defaultMeta: { service: 'winston-ecs' },
      // defaultMeta: { service: 'winston-lambda' },
      transports: [
        new transports.Console()
      ],
    });
  }

  verbose(message: string) {
    this.logger.verbose(message)
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  log(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace)
  }

}
