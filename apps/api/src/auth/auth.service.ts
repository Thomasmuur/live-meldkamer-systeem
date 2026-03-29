import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type SteamUserInput = {
  steamId: string;
  profile?: {
    displayName?: string;
    photos?: Array<{ value: string }>;
  };
};

type DiscordUserInput = {
  discordId: string;
  username: string;
  globalName: string;
  email: string;
  avatar: string;
};

export type AppUser = {
  id: string;
  steamId: string;
  displayName: string | null;
  avatarUrl: string | null;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async findOrCreateSteamUser(input: SteamUserInput): Promise<AppUser> {
    // Replace this with Prisma/DB lookup
    // const existing = await prisma.user.findUnique({ where: { steamId: input.steamId } });
    // if (existing) return existing;

    return {
      id: `user_${input.steamId}`,
      steamId: input.steamId,
      displayName: input.profile?.displayName ?? null,
      avatarUrl: input.profile?.photos?.[0]?.value ?? null,
    };
  }

  async findOrCreateDiscordUser(input: DiscordUserInput): Promise<AppUser> {
    return {
      id: `user_${input.discordId}`,
      steamId: input.discordId,
      displayName: input.globalName,
      avatarUrl: input.avatar,
    };
  }

  async issueJwt(user: AppUser): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      steamId: user.steamId,
    });
  }
}
