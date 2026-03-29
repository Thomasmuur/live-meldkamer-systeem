import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './configuration/database';

@Module({
  imports: [
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api/.env', '.env'],
    }),

    DatabaseConfiguration.getRootImport(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
