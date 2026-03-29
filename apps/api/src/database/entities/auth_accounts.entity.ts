import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export type AuthProvider = 'steam' | 'discord';

@Entity('auth_accounts')
@Unique(['provider', 'providerUserId'])
export class AuthAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.authAccounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar' })
  provider!: AuthProvider;

  @Column({ name: 'provider_user_id', type: 'varchar' })
  providerUserId!: string;

  @Column({ nullable: true, name: 'display_name', type: 'varchar' })
  displayName!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @Column({ name: 'access_token', type: 'text', nullable: true, select: false })
  accessToken!: string | null;

  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshToken!: string | null;

  @Column({ name: 'expires_at', type: 'bigint', nullable: true })
  expiresAt!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
