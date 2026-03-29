import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:9163',
    credentials: true,
  });

  await app.listen(3000);
}

void bootstrap();
