import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 👈 This allows your Next.js app to talk to this server!
  await app.listen(3000);
}
bootstrap();