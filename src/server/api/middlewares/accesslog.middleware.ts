import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccessLogsService } from '../models/access-logs/access-logs.service';

@Injectable()
export class AccesslogMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  constructor(
    private readonly accessLogsService: AccessLogsService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const oldEnd = res.end;
    const chunks = [];
    let self = this;
    res.end = function (chunk: any) {
      if (chunk)
        chunks.push(chunk);

      const body = Buffer.concat(chunks).toString('utf8');

      self.accessLogsService.create(req, res, body);

      oldEnd.apply(res, arguments);
    };
    next();
  }
}
