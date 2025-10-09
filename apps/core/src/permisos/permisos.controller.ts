import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { PermisoDTO } from '../app/dtos/permiso.dto'
import { Modulos, Permissions } from '../app/interfaces'
import { LogType } from '../app/models/log.model'
import { RegisterLog, RequireMask, RequireModule } from '../app/utils/decorators'
import { PermisosService } from './permisos.service'

@Controller(Modulos.PERMISOS)
@RequireModule(Modulos.PERMISOS)
export class PermisosController {
	constructor(private readonly permisosService: PermisosService) {}

	@Get()
	@RequireMask([Permissions.READ])
	findAll() {
		return this.permisosService.findAll()
	}

	@Post()
	@RequireMask([Permissions.CREATE])
	@RegisterLog('Permiso Creado', LogType.CREATE)
	create(@Body() createPermisoDto: PermisoDTO) {
		console.log(createPermisoDto)
		return this.permisosService.create(createPermisoDto)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.permisosService.findOne(+id)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.permisosService.remove(+id)
	}
}
