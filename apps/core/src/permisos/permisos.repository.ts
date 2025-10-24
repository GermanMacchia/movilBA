import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Permiso } from '../app/models/permiso.model'
import { handleException } from '../app/utils/handleException'
import to from 'await-to-js'

@Injectable()
export class PermisosRepository {
	private readonly logger = new Logger('Permisos repository')

	constructor(
		@InjectModel(Permiso, CORE_DB)
		private permisoModel: typeof Permiso,
	) {}

	async create(createPermisoDto: any) {
		const [error, data] = await to(this.permisoModel.create(createPermisoDto))

		if (error)
			handleException(
				this.logger,
				'create error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	async remove(id: number) {
		const [error, data] = await to(this.permisoModel.destroy({ where: { id } }))

		if (error)
			handleException(
				this.logger,
				'remove error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return { statusCode: HttpStatus.OK }
	}
}
