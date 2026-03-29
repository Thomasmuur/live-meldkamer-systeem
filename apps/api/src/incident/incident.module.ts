import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';

@Module({
  providers: [IncidentService],
  controllers: [IncidentController]
})
export class IncidentModule {}
