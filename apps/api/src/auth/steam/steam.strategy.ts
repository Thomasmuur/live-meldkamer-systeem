import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      returnURL: config.getOrThrow<string>('STEAM_RETURN_URL'),
      realm: config.getOrThrow<string>('STEAM_REALM'),
      apiKey: config.getOrThrow<string>('STEAM_API_KEY'),
    });
  }

  async validate(
    identifier: string,
    profile: any,
    done: (err: unknown, user?: any) => void,
  ): Promise<void> {
    try {
      const steamId = this.extractSteamId(identifier);

      const user = await this.authService.findOrCreateSteamUser({
        steamId,
        profile,
      });

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }

  private extractSteamId(identifier: string): string {
    // identifier example:
    // https://steamcommunity.com/openid/id/7656119...
    const steamId = identifier.split('/').pop();
    if (!steamId || !/^\d+$/.test(steamId)) {
      throw new Error('Invalid Steam claimed identifier');
    }
    return steamId;
  }
}
