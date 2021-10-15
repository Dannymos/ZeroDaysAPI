import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Http request');

  use(request: Request, response: Response, next: NextFunction): void {
    const recievedAt = Date.now();
    const { method, originalUrl } = request;

    this.logger.log(
      `Request received: [${method}] ${originalUrl} - pending...`,
    );

    if (Object.keys(request.body).length >= 1) this.logger.debug(`Request body: ${JSON.stringify(request.body)}`);

    response.on('finish', () => {
      const finishedAt = Date.now();
      const requestDuration = (finishedAt - recievedAt);
      const { statusCode, statusMessage } = response;
      response.get('body');
      this.logger.log(
        `Request resolved [${method}] ${originalUrl} : [${statusCode}] ${statusMessage} - ${requestDuration}ms`,
      );

      if (Object.keys(response.req.body).length >= 1) this.logger.debug(`Response body: ${JSON.stringify(response.req.body)}`);
    });

    next();
  }
}
