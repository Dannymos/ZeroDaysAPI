import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import AppModule from './modules/app.module';

async function bootstrap() {
  const isDevelopmentEnvironment = (process.env.NODE_ENV === 'development');
  const app = await NestFactory.create(AppModule, {
    logger: isDevelopmentEnvironment ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (isDevelopmentEnvironment) {
    const config = new DocumentBuilder()
      .setTitle('ZeroDays API')
      .setDescription('The ZeroDays API description')
      .setVersion('1.0')
      .addTag('ZeroDays')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
