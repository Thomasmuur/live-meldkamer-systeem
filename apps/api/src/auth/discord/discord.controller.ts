import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppUser, AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { DiscordAuthGuard } from './discord-auth.guard';

type ReturnRequest = Request & {
  user: AppUser;
};

@Controller('auth/discord')
export class DiscordController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Get('')
  @UseGuards(DiscordAuthGuard)
  async steamLogin(): Promise<void> {
    // passport-steam handles the redirect
  }

  @Get('return')
  @UseGuards(DiscordAuthGuard)
  async steamReturn(@Req() req: ReturnRequest, @Res() res: Response) {
    const user = req.user as any;
    const token = await this.authService.issueJwt(user);

    console.log(user, token);

    const frontendUri = this.config.getOrThrow<string>('FRONTEND_URL');
    const nodeEnv = this.config.getOrThrow<string>('NODE_ENV');

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.redirect(`${frontendUri}/auth/callback`);
  }
}
