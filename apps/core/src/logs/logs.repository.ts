import { HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import to from 'await-to-js';
import { CORE_DB } from '../app/dbs/coreDB.module';
import { Usuario } from '../app/models';
import { Log, LogType } from '../app/models/log.model';
import { handleException } from '../app/utils/handleException';

export interface LogInfo {
	usuario_id: number;
	descripcion: string;
	tipo_log: LogType;
}

export class LogsRepository {
	private readonly logger: Logger

	constructor(
		@InjectModel(Log, CORE_DB)
		private logModel: typeof Log,
	) {
		this.logger = new Logger('Logs repository')
	}

	async createLog(info: LogInfo) {
		return await this.logModel.create({ ...info });
	}

	async findLogs({ limit, offset }) {
		const [error, data] = await to(this.logModel.findAll({
			attributes: ['descripcion', 'tipo_log', 'created_at'],
			order: [['created_at', 'DESC']],
			limit: limit,
			offset: offset,
			include: {
				model: Usuario,
				attributes: ['cuil', 'nombre', 'email'],
			},
		}))

		if (error)
			handleException(
				this.logger,
				'findLogs error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)

		return {
			data,
			total: await this.logModel.count()
		}
	}
}
