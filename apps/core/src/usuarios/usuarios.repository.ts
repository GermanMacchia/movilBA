import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpStatus, Inject, Logger } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/sequelize'

import to from 'await-to-js'
import { Cache } from 'cache-manager'
import { Sequelize } from 'sequelize-typescript'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { UsuarioCreateDTO, UsuarioEditDTO } from '../app/dtos/usuario.dto'
import { Modulo, Permiso } from '../app/models'
import { Usuario } from '../app/models/usuario.model'
import { handleException } from '../app/utils/handleException'

export class UsuarioRepository {
	private readonly logger: Logger
	private permisosQuery = [
		{
			model: Permiso,
			nest: true,
			attributes: ['permisos', 'id'],
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
		private readonly sequelize: Sequelize,
	) {
		this.logger = new Logger('Usuario repository')
	}

	async findAll(): Promise<Usuario[]> {
		const [error, data] = await to(
			this.usuarioModel.findAll({
				attributes: ['id', 'cuil', 'nombre', 'email', 'ultimo_login', 'deletedAt'],
				paranoid: false,
				include: this.permisosQuery,
			}),
		)

		if (error)
			handleException(
				this.logger,
				'findAll error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data?.map(user => user.get({ plain: true })) || []
	}

	/**
	 *
	 * @param cuil
	 * @returns usuario
	 * Cacheado para optimizar permisos
	 */
	async findByCuil(cuil: string): Promise<Usuario> {
		if (!cuil) return

		const cachedUser: string = await this.cacheManager.get(cuil)

		if (cachedUser) return JSON.parse(cachedUser)

		const [error, data] = await to(
			this.usuarioModel.findOne({
				where: { cuil },
				nest: true,
				attributes: ['id', 'nombre', 'password', 'email', 'cuil'],
				include: this.permisosQuery,
			}),
		)

		if (error)
			handleException(
				this.logger,
				'findByCuil error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		const user = data?.get({ plain: true })

		if (user) this.cacheManager.set(cuil, JSON.stringify(user))

		return user
	}

	async updateLogon(id: number) {
		const [error, _data] = await to(
			this.usuarioModel.update({ ultimo_login: new Date() }, { where: { id } }),
		)

		if (error)
			handleException(
				this.logger,
				'updateLogon error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)
	}

	async create(usuario: UsuarioCreateDTO) {
		const [error, _data] = await to(this.usuarioModel.create({ ...usuario }))

		if (error)
			handleException(
				this.logger,
				'create error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return { message: 'created', status: HttpStatus.CREATED }
	}

	async update(usuario_id: number, usuarioData: UsuarioEditDTO) {
		const [error, data] = await to(
			this.usuarioModel.update(usuarioData, { where: { id: usuario_id } }),
		)

		if (error)
			handleException(
				this.logger,
				'update error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	async remove(usuario_id: number) {
		const [error, _data] = await to(
			this.usuarioModel.destroy({ where: { id: usuario_id } }),
		)

		if (error)
			handleException(
				this.logger,
				'remove error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return { statusCode: HttpStatus.OK }
	}

	async restore(usuario_id: number) {
		const t = await this.sequelize.transaction()

		try {
			await this.usuarioModel.restore({
				where: { id: usuario_id },
				transaction: t,
			})

			await t.commit()

			return { statusCode: HttpStatus.OK }
		} catch (error) {
			await t.rollback()
			handleException(
				this.logger,
				'restore error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)
		}
	}
}
