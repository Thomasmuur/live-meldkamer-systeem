import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthAccount } from './auth_accounts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  avatar!: string;

  @Column({ type: 'boolean', name: 'is_admin', default: false })
  isAdmin!: boolean;

  @OneToMany(() => AuthAccount, (account) => account.user)
  authAccounts!: AuthAccount[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
