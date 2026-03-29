import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Incident } from './incident.entity';

export enum IncidentLogEntryType {
  Update = 'update',
  Closed = 'closed',
  StatusChange = 'status_change',
  UnitAssigned = 'unit_assigned',
  UnitUnassigned = 'unit_unassigned',
}

@Entity('incident_logs')
export class IncidentLogEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'incident_id' })
  incidentId!: number;

  @ManyToOne(() => Incident)
  incidents!: Incident[];

  @Column({ type: 'enum', enum: IncidentLogEntryType })
  type!: IncidentLogEntryType;

  @Column({ type: 'json', nullable: true })
  metadata!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
