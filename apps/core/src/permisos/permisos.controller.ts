import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common'
import { PermisoDTO } from '../app/dtos/permiso.dto'
import { Modulos, Permissions } from '../app/interfaces'
import { LogType } from '../app/models/log.model'
import { RegisterLog, RequireMask, RequireModule } from '../app/utils/decorators'
import { PermisosService } from './permisos.service'

@Controller(Modulos.PERMISOS)
@RequireModule(Modulos.PERMISOS)
export class PermisosController {
	constructor(private readonly permisosService: PermisosService) {}

	@Post()
	@RequireMask([Permissions.CREATE])
	@RegisterLog('Permiso Creado', LogType.CREATE)
	create(@Body() createPermisoDto: PermisoDTO) {
		return this.permisosService.create(createPermisoDto)
	}

	@Delete(':id')
	@RequireMask([Permissions.DELETE])
	@RegisterLog('Permiso Borrado', LogType.DELETE)
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.permisosService.remove(id)
	}
}
