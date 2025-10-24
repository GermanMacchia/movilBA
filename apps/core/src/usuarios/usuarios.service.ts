import { ConflictException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as bcrypt from 'bcrypt'

import { UsuarioCreateDTO, UsuarioEditDTO } from '../app/dtos/usuario.dto'
import { UsuarioRepository } from './usuarios.repository'

@Injectable()
export class UsuariosService {
	constructor(private readonly db: UsuarioRepository) {}

	users = () => this.db.findAll()

	delete = (usuario_id: number) => this.db.remove(usuario_id)

	restore = (usuario_id: number) => this.db.restore(usuario_id)

	async create(usuario: UsuarioCreateDTO) {
		const [user] = (await this.db.findAll()).filter(ele => ele.cuil === usuario.cuil)

		if (user) throw new ConflictException('Usuario existente')

		const hash = await bcrypt.hash(usuario.password, 10)

		return this.db.create({
			nombre: usuario.nombre,
			cuil: usuario.cuil,
			email: usuario.email,
			password: hash,
		})
	}

	async edit(usuario_id: number, usuarioData: UsuarioEditDTO) {
		const [user] = (await this.db.findAll()).filter(
			ele => ele.cuil === usuarioData.cuil,
		)

		if (user.id !== usuario_id) throw new ConflictException('Cuil existente')

		return this.db.update(usuario_id, usuarioData)
	}
}
