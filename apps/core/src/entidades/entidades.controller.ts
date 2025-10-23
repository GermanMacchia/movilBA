import { Controller, Delete, Get, Param, UseFilters } from '@nestjs/common'
import { Modulos, Permissions } from '../app/interfaces'

import { RequireMask, RequireModule } from '../app/utils/decorators'
import { EntidadesService } from './entidades.service'
import { DatabaseExceptionFilter } from '../app/dbs/db-exception.filter'

@Controller('entidades')
@UseFilters(DatabaseExceptionFilter)
@RequireModule(Modulos.RUTAP)
export class EntidadesController {
	constructor(private readonly entidadesService: EntidadesService) {}

	@Get()
	@RequireMask([Permissions.READ])
	findAll() {
		return this.entidadesService.findAll()
	}
}
