import { Injectable } from '@nestjs/common'

import { LogsRepository } from './logs.repository'

@Injectable()
export class LogsService {
	constructor(private readonly db: LogsRepository) {}

	async find({ offset, limit }) {
		return await this.db.findLogs({ offset, limit })
	}
}
