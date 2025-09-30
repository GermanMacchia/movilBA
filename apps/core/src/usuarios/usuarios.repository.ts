import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpStatus, Inject, Logger } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/sequelize'

import { Cache } from 'cache-manager'
import { Sequelize } from 'sequelize-typescript'
import { CORE_DB, DB_TIMESTAMPS } from '../app/dbs/coreDB.module'
import { UsuarioDTO } from '../app/dtos/usuario.dto'
import { Usuario } from '../app/models/usuario.model'
import { handleException } from '../app/utils/handleException'
import to from 'await-to-js'
import { Modulo, Permiso } from '../app/models'

export class UsuarioRepository {
	private readonly logger: Logger
	private permisosQuery = [
		{
			model: Permiso,
			attributes: ['permisos'],
			include: [
				{
					model: Modulo,
					attributes: ['nombre'],
				},
			],
		},
	]

	constructor(
		@InjectModel(Usuario, CORE_DB)
		private usuarioModel: typeof Usuario,
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache,
		@InjectConnection(CORE_DB)
		private readonly sequelize: Sequelize
	) {
		this.logger = new Logger('Usuario repository')
	}

	async findAll(): Promise<Usuario[]> {
		const [error, data] = await to(
			this.usuarioModel.findAll({
				raw: true,
				nest: true,
				attributes: ['id', 'cuil', 'email'],
				include: this.permisosQuery,
			})
		)

		if (error)
			handleException(
				this.logger,
				'findAll error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)

		return data
	}

	/**
	 *
	 * @param cuil
	 * @returns usuario
	 * Cacheado para optimizar permisos
	 */
	async findByCuil(cuil: string): Promise<Usuario> {
		const cachedUser: Usuario = await this.cacheManager.get(cuil)

		if (cachedUser) return cachedUser

		const [error, data] = await to(
			this.usuarioModel.findOne({
				where: { cuil },
				nest: true,
				raw: true,
				attributes: ['id', 'nombre', 'password'],
				include: this.permisosQuery,
			})
		)

		if (error)
			handleException(
				this.logger,
				'findByCuil error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)

		if (data) this.cacheManager.set(cuil, data)

		return data
	}

	async updateUsuarioLogon(usuario_id: number) {
		const [error, _data] = await to(
			this.usuarioModel.update(
				{ ultimo_login: new Date() },
				{ where: { id: usuario_id } }
			)
		)

		if (error)
			handleException(
				this.logger,
				'updateUsuarioLogon error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)
	}

	async createUsuario(usuario: UsuarioDTO) {
		const [error, _data] = await to(this.usuarioModel.create({ ...usuario }))

		if (error)
			handleException(
				this.logger,
				'createUsuario error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)

		return { message: 'created', status: HttpStatus.CREATED }
	}

	async deleteUsuario(usuario_id: number) {
		const [error, data] = await to(
			this.usuarioModel.destroy({ where: { id: usuario_id } })
		)

		if (error)
			handleException(
				this.logger,
				'deleteUsuario error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)

		return data
	}

	async restoreUsuario(usuario: Usuario) {
		const t = await this.sequelize.transaction()

		try {
			await this.usuarioModel.restore({
				where: { cuil: usuario.cuil },
				transaction: t,
			})

			await t.commit()

			return { usuario_id: usuario.id, status: HttpStatus.OK }
		} catch (error) {
			await t.rollback()
			handleException(
				this.logger,
				'restoreUsuario error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)
		}
	}
}
