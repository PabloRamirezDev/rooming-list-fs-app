import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);

  await app.listen(PORT, () => {
    logger.log(`App listening on port ${PORT}`, 'main');
  });
}
bootstrap();
