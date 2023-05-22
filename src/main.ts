import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT);
  await app
    .listen(port)
    .then(() => console.log(`Server running on port ${port}!`));
}
bootstrap();
