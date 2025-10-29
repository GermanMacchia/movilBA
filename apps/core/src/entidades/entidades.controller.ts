import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common'
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

	@Get('vehiculos/:id')
	@RequireMask([Permissions.READ])
	findVehiculos(@Param('id', ParseIntPipe) id: number) {
		return this.entidadesService.findVehiculosById(id)
	}

	@Get('lineas/:id')
	@RequireMask([Permissions.READ])
	findLineas(@Param('id', ParseIntPipe) id: number) {
		return this.entidadesService.findLineasById(id)
	}
}
