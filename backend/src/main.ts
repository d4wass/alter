import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // in enableCors we can automatically set up a cookies for application
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
