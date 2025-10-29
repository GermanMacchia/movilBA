import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { Modulos, Permissions } from '../app/interfaces'
import { RegisterLog, RequireMask, RequireModule } from '../app/utils/decorators'
import { ModulosService } from './modulos.service'
import { LogType } from '@movilBA/core/models/log.model'

@Controller('modulos')
@RequireModule(Modulos.PERMISOS)
export class ModulosController {
	constructor(private readonly modulosService: ModulosService) {}

	@Post()
	@RequireMask([Permissions.CREATE])
	@RegisterLog('Módulo Creado', LogType.CREATE)
	create(@Body() createModuloDto: ModuloDTO) {
		return this.modulosService.create(createModuloDto)
	}

	@Get()
	@RequireMask([Permissions.READ])
	findAll() {
		return this.modulosService.findAll()
	}
}
