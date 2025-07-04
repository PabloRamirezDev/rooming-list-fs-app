import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new JwtAuthGuard(app.get(ConfigService)));

  const logger = app.get(Logger);

  await app.listen(PORT, () => {
    logger.log(`App listening on port ${PORT}`, 'main');
  });
}
bootstrap();
