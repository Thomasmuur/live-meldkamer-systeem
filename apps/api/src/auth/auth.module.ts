import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from './steam/steam.strategy';
import { SteamController } from './steam/steam.controller';
import { DiscordController } from './discord/discord.controller';
import { DiscordStrategy } from './discord/discord.strategy';
import { AuthAccount } from '../database/entities/auth_accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DiscordService } from './discord/discord.service';

@Module({
  providers: [AuthService, SteamStrategy, DiscordStrategy, DiscordService],
  controllers: [AuthController, DiscordController, SteamController],
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([User, AuthAccount]),
  ],
})
export class AuthModule {}
