import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common'

import { UsuariosService } from './usuarios.service'
import { UsuarioDTO } from '../app/dtos/usuario.dto'

@Controller('usuarios')
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Get()
	getAll() {
		return this.usuariosService.users()
	}

	@Post()
	crear(@Body() usuario: UsuarioDTO) {
		return this.usuariosService.create(usuario)
	}

	// @Get(':cuil/info')
	// async getCuilInfo(@Param('cuil') cuil: string) {
	// 	return this.usuariosService.userInfo(cuil);
	// }

	// @Put(':usuario_id')
	// editar(
	// 	@Param('usuario_id', ParseIntPipe) usuario_id: number,
	// 	@Body() usuario: UsuarioDTO,
	// ) {
	// 	return this.usuariosService.editar(usuario, usuario_id);
	// }

	@Delete(':usuario_id')
	delete(@Param('usuario_id', ParseIntPipe) usuario_id: number) {
		return this.usuariosService.delete(usuario_id)
	}
}
