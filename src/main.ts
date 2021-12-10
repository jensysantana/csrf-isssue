import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
    // prefix: '/api/v1'
  });
  const csrfProtection = csurf({
    cookie: {
      key: 'XSRF-TOKEN', // can set a custome cookie name.
      path: '/',
      httpOnly: true,
      secure: false,
      // maxAge: -20000, // 14 days,
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days,
      // maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days,
      sameSite: 'lax',
      // ignoreRoutes: ['admin', 'api'],

      // signed: true,
    },
  });

  app.use(csrfProtection);

  await app.listen(3590);
}
bootstrap();
