import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import to from 'await-to-js'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { Modulo } from '../app/models/modulo.model'
import { handleException } from '../app/utils/handleException'

@Injectable()
export class ModulosRespository {
	private readonly logger = new Logger('Modulos repository')

	constructor(
		@InjectModel(Modulo, CORE_DB)
		private moduloModel: typeof Modulo,
	) {}

	async create(createPermisoDto: ModuloDTO) {
		const [error, data] = await to(this.moduloModel.create(createPermisoDto))

		if (error)
			handleException(
				this.logger,
				'create error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	async findAll() {
		const [error, data] = await to(
			this.moduloModel.findAll({ attributes: ['id', 'nombre'] }),
		)

		if (error)
			handleException(
				this.logger,
				'findAll error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	findOne(id: number) {
		return `This action returns a #${id} permiso`
	}

	remove(id: number) {
		return `This action removes a #${id} permiso`
	}
}
