import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SteamAuthGuard } from './steam-auth.guard';
import { AppUser, AuthService } from '../auth.service';

type ReturnRequest = Request & {
  user: AppUser;
};

@Controller('auth/steam')
export class SteamController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Get('')
  @UseGuards(SteamAuthGuard)
  async steamLogin(): Promise<void> {
    // passport-steam handles the redirect
  }

  @Get('return')
  @UseGuards(SteamAuthGuard)
  async steamReturn(@Req() req: ReturnRequest, @Res() res: Response) {
    const user = req.user as any;
    const token = await this.authService.issueJwt(user);

    const frontendUri = this.config.getOrThrow<string>('FRONTEND_URL');
    const nodeEnv = this.config.getOrThrow<string>('NODE_ENV');

    console.log(user);
    console.log(token);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.redirect(`${frontendUri}/auth/callback`);
  }
}
