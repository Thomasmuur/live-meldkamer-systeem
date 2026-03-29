import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResponderType } from './responder-type.entity';
import { Status } from './status.entity';
import { User } from './user.entity';
import { Incident } from './incident.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  callsign!: string;

  @Column({ type: 'int', name: 'responder_type_id' })
  responderTypeId!: number;

  @ManyToOne(() => ResponderType, (type) => type.units, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responder_type_id' })
  responderType!: ResponderType;

  @Column({ type: 'int', name: 'status_id' })
  statusId!: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status!: Status;

  @Column({ type: 'datetime', nullable: true })
  archivedAt!: Date | null;

  @ManyToMany(() => User, (user) => user.units)
  users!: User[];

  @ManyToMany(() => Incident, (incident) => incident.units)
  incidents!: Incident[];

  @Column({ type: 'varchar', length: 10 })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
