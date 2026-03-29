import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthAccount } from '../database/entities/auth_accounts.entity';
import { User } from '../database/entities/user.entity';

export class DatabaseConfiguration {
  public static getRootImport(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        connectorPackage: 'mysql2',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [AuthAccount, User],
        migrations: [__dirname + '../database/migrations/*-migration.ts'],
        synchronize: false,
      }),
    });
  }
}
