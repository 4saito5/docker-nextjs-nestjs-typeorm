import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from '../util/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new CustomLoggerService(),
  });
  // app.useLogger(app.get(CustomLoggerService));
  // app.enableCors();
  await app.listen(8000);
  // console.log('log message.');
  // console.debug('debug message.');
  // console.info('info message.');
  // console.warn('warn message.');
  // console.error('error message.');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
