import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import {
  AuthAccount,
  AuthProvider,
} from '../database/entities/auth_accounts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordService } from './discord/discord.service';

type SteamUserInput = {
  steamId: string;
  profile?: {
    displayName?: string;
    photos?: Array<{ value: string }>;
  };
};

type DiscordUserInput = {
  id: string;
  username: string;
  global_name: string;
  avatar: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AuthAccount)
    private readonly authAccountsRepository: Repository<AuthAccount>,
  ) {}

  private readonly logger = new Logger('AuthService');

  async findOrCreateSteamUser(input: SteamUserInput): Promise<User> {
    const authAccount = await this.findUserByAuthAccount(
      'steam',
      input.steamId,
    );

    if (!input.profile?.displayName || !input.profile?.photos) {
      if (!authAccount) {
        throw new BadGatewayException('Could not access profile data');
      }

      return authAccount.user;
    }

    const displayName = input.profile?.displayName;
    const avatar =
      input.profile?.photos[input.profile?.photos.length - 1].value;

    if (authAccount) {
      const updatedUser = await this.updateUser(
        authAccount.user,
        displayName,
        avatar,
      );

      await this.updateAuthAccount(authAccount, displayName, avatar);

      return updatedUser;
    }

    const { user } = await this.createUserFromProvider(
      'steam',
      input.steamId,
      displayName,
      avatar,
    );

    return user;
  }

  async findOrCreateDiscordUser(input: DiscordUserInput): Promise<User> {
    const authAccount = await this.findUserByAuthAccount('discord', input.id);

    const displayName = input.global_name;
    const avatar = DiscordService.buildAvatarUrl(input.id, input.avatar);

    if (authAccount) {
      const updatedUser = await this.updateUser(
        authAccount.user,
        displayName,
        avatar,
      );

      await this.updateAuthAccount(authAccount, displayName, avatar);

      return updatedUser;
    }

    const { user } = await this.createUserFromProvider(
      'discord',
      input.id,
      displayName,
      avatar,
    );

    return user;
  }

  async issueJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      steamId: user.id,
    });
  }

  private async findUserByAuthAccount(
    provider: AuthProvider,
    providerUserId: string,
  ): Promise<AuthAccount | null> {
    return await this.authAccountsRepository.findOne({
      where: {
        provider: provider,
        providerUserId: providerUserId,
      },
      relations: ['user'],
    });
  }

  private async updateUser(
    user: User,
    username: string,
    avatar: string,
  ): Promise<User> {
    user.username = username;
    user.avatar = avatar;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Could not update user', error);
      throw new InternalServerErrorException('Could not update user');
    }

    return user;
  }

  private async updateAuthAccount(
    authAccount: AuthAccount,
    displayName: string,
    avatar: string,
  ): Promise<AuthAccount> {
    authAccount.displayName = displayName;
    authAccount.avatar = avatar;

    try {
      await this.authAccountsRepository.save(authAccount);
    } catch (error) {
      this.logger.error('Could not update AuthAccount', error);
      throw new InternalServerErrorException('Could not update user');
    }

    return authAccount;
  }

  private async createUserFromProvider(
    provider: AuthProvider,
    providerUserId: string,
    username: string,
    avatar: string,
  ): Promise<{ user: User; authAccount: AuthAccount }> {
    try {
      const user = this.userRepository.create({
        username: username,
        avatar: avatar,
      });

      await this.userRepository.save(user);

      const authAccount = this.authAccountsRepository.create({
        userId: user.id,
        provider: provider,
        providerUserId: providerUserId,
        displayName: username,
        avatar: avatar,
      });
      await this.authAccountsRepository.save(authAccount);

      return { user, authAccount };
    } catch (error) {
      this.logger.error('Could not create user or AuthAccount', error);
      throw new InternalServerErrorException('Could not create user');
    }
  }
}
