import { Module } from '@nestjs/common'
import { EntidadesController } from './entidades.controller'
import { EntidadesRepository } from './entidades.repository'
import { EntidadesService } from './entidades.service'
import { MultiDbService } from '../app/dbs/multi-db.service'

@Module({
	imports: [],
	controllers: [EntidadesController],
	providers: [EntidadesService, EntidadesRepository, MultiDbService],
})
export class EntidadesModule {}
