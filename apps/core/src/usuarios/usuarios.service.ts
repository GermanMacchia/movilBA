import { ConflictException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as bcrypt from 'bcrypt'

import { UsuarioDTO } from '../app/dtos/usuario.dto'
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

	async create(usuario: UsuarioDTO) {
		const user = await this.db.findByCuil(usuario.cuil)

		if (user && user.deletedAt) return this.db.restoreUsuario(user)

		if (user && !user.deletedAt) throw new ConflictException('Usuario existente')

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

	// async userInfo(cuil: string) {
	// 	const user = await this.db.findCuil(cuil, true);

	// 	if (user) throw new ConflictException('Usuario existente');

	// 	return this.cuilADInfo(cuil);
	// }

	/*
	 * Hace un llamado a endpoint de AD GCBA para verificar que el cuil esté registrado
	 */
	// async cuilADInfo(cuil: string) {
	// 	try {
	// 		const response = await firstValueFrom(
	// 			this.httpService.get(this.config.cuentasUrl.replace('[C]', cuil), {
	// 				headers: {
	// 					'Content-Type': this.config.content_type,
	// 					client_id: this.config.client_id,
	// 					client_secret: this.config.client_secret,
	// 				},
	// 			}),
	// 		);

	// 		return response.data;
	// 	} catch (error) {
	// 		throw new HttpException(
	// 			error.response?.data?.message,
	// 			error.response?.status,
	// 		);
	// 	}
	// }
}
