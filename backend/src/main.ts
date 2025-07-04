import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = app.get(Logger);

  await app.listen(PORT, () => {
    logger.log(`App listening on port ${PORT}`, 'main');
  });
}
bootstrap();
