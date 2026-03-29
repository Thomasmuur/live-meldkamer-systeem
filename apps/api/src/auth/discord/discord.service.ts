import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  public static buildAvatarUrl(id: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`;
  }
}
