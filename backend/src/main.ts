import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable cors
  app.enableCors();

  // validator 
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4000);
}
bootstrap();
