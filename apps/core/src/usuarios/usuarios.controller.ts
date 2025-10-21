import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common'

import { UsuarioCreateDTO, UsuarioEditDTO } from '../app/dtos/usuario.dto'
import { Modulos, Permissions } from '../app/interfaces'
import { LogType } from '../app/models/log.model'
import { RegisterLog, RequireMask, RequireModule } from '../app/utils/decorators'
import { UsuariosService } from './usuarios.service'

@Controller('usuarios')
@RequireModule(Modulos.PERMISOS)
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Get()
	@RequireMask([Permissions.READ])
	getAll() {
		return this.usuariosService.users()
	}

	@Post()
	@RequireMask([Permissions.CREATE])
	@RegisterLog('Usuario Creado', LogType.CREATE)
	create(@Body() usuario: UsuarioCreateDTO) {
		return this.usuariosService.create(usuario)
	}

	@Put(':usuario_id')
	@RequireMask([Permissions.WRITE])
	@RegisterLog('Usuario Editado', LogType.WRITE)
	edit(
		@Param('usuario_id', ParseIntPipe) usuario_id: number,
		@Body() usuario: UsuarioEditDTO,
	) {
		return this.usuariosService.edit(usuario_id, usuario)
	}

	@Delete(':usuario_id')
	@RequireMask([Permissions.DELETE])
	@RegisterLog('Usuario Restringido', LogType.DELETE)
	delete(@Param('usuario_id', ParseIntPipe) usuario_id: number) {
		return this.usuariosService.delete(usuario_id)
	}

	@Put('restore/:usuario_id')
	@RequireMask([Permissions.WRITE])
	@RegisterLog('Usuario Restaurado', LogType.WRITE)
	restore(@Param('usuario_id', ParseIntPipe) usuario_id: number) {
		return this.usuariosService.restore(usuario_id)
	}
}
