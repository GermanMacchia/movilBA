import { Module } from '@nestjs/common';
import { EntidadesController } from './entidades.controller';
import { EntidadesRepository } from './entidades.repository';
import { EntidadesService } from './entidades.service';

@Module({
  imports: [],
  controllers: [EntidadesController],
  providers: [EntidadesService, EntidadesRepository],
})
export class EntidadesModule { }
