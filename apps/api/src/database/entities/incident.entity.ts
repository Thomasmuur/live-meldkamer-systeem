import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Unit } from './unit.entity';

export enum IncidentStatus {
  Open = 'open',
  Dispatched = 'dispatched',
  Closed = 'closed',
}

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 4 })
  code!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'enum', enum: IncidentStatus })
  status!: IncidentStatus;

  @Column({ type: 'varchar', name: 'location_label', nullable: true })
  locationLabel!: string | null;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  latitude!: number | null;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  longitude!: number | null;

  @Column({ type: 'varchar', name: 'reporter_name', nullable: true })
  reporterName!: string | null;

  @Column({ type: 'datetime', name: 'closed_at', nullable: true })
  closedAt!: Date | null;

  @ManyToMany(() => Unit, (unit) => unit.incidents)
  units!: Unit[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
