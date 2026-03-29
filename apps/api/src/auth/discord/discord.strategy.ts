import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.getOrThrow<string>('DISCORD_CLIENT_ID'),
      clientSecret: config.getOrThrow<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: config.getOrThrow<string>('DISCORD_CALLBACK_URL'),
      scope: ['identify'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: unknown, user?: any) => void,
  ): Promise<void> {
    try {
      const user = await this.authService.findOrCreateDiscordUser({
        discordId: profile.id,
        username: profile.username ?? null,
        globalName: profile.global_name ?? null,
        email: profile.email ?? null,
        avatar: profile.avatar ?? null,
      });

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
}
