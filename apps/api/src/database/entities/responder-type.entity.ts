import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Unit } from './unit.entity';

@Entity('responder_types')
export class ResponderType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', length: 5 })
  label!: string;

  @Column({ type: 'varchar', name: 'color_hex', length: 6 })
  colorHex!: string;

  @OneToMany(() => Unit, (unit) => unit.responderType)
  units!: Unit[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
