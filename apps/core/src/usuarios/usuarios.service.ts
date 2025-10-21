import { ConflictException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as bcrypt from 'bcrypt'

import { UsuarioCreateDTO, UsuarioEditDTO } from '../app/dtos/usuario.dto'
import { UsuarioRepository } from './usuarios.repository'

@Injectable()
export class UsuariosService {
	constructor(
		private readonly db: UsuarioRepository,
		private readonly configService: ConfigService,
	) {}

	users() {
		return this.db.findAll()
	}

	async create(usuario: UsuarioCreateDTO) {
		const [user] = (await this.db.findAll()).filter(ele => ele.cuil === usuario.cuil)

		if (user) throw new ConflictException('Usuario existente')

		const hash = await bcrypt.hash(usuario.password, 10)

		return this.db.createUsuario({
			nombre: usuario.nombre,
			cuil: usuario.cuil,
			email: usuario.email,
			password: hash,
		})
	}

	delete(usuario_id: number) {
		return this.db.deleteUsuario(usuario_id)
	}

	restore(usuario_id: number) {
		return this.db.restoreUsuario(usuario_id)
	}

	async edit(usuario_id: number, usuarioData: UsuarioEditDTO) {
		const [user] = (await this.db.findAll()).filter(
			ele => ele.cuil === usuarioData.cuil,
		)

		if (user.id !== usuario_id) throw new ConflictException('Cuil existente')

		return this.db.updateUsuario(usuario_id, usuarioData)
	}
}
