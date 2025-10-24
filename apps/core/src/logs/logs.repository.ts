import { HttpStatus, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import to from 'await-to-js'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Usuario } from '../app/models'
import { Log, LogType } from '../app/models/log.model'
import { handleException } from '../app/utils/handleException'

export interface LogInfo {
	usuario_id: number
	descripcion: string
	tipo_log: LogType
	info: any
}

export class LogsRepository {
	private readonly logger: Logger

	constructor(
		@InjectModel(Log, CORE_DB)
		private logModel: typeof Log,
	) {
		this.logger = new Logger('Logs repository')
	}

	async createLog(data: LogInfo) {
		//para que no figure el password en bd info log
		delete data.info?.body?.password
		return await this.logModel.create({ ...data })
	}

	async findAll({ limit, offset }) {
		const [error, data] = await to(
			this.logModel.findAll({
				attributes: ['descripcion', 'tipo_log', 'info', 'created_at'],
				order: [['created_at', 'DESC']],
				limit: limit,
				offset: offset,
				include: {
					model: Usuario,
					attributes: ['cuil', 'nombre', 'email'],
				},
			}),
		)

		if (error)
			handleException(
				this.logger,
				'findAll error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return {
			data,
			total: await this.logModel.count(),
		}
	}
}
