import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT);
  await app
    .listen(port)
    .then(() => console.log(`Server running on port ${port}!`));
}
bootstrap();
