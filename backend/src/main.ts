import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3001

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
  app.use(cookieParser())
  app.use(
      session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        name: 'FITNESS_CLUB_APP',
        cookie: {
          maxAge: 86400000, // cookie expires 1 day later
        }
      })
  )
  try {
    await app.listen(PORT,
        () => console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}
bootstrap();
