import { Injectable } from '@nestjs/common'

import { LogsRepository } from './logs.repository'

@Injectable()
export class LogsService {
	constructor(private readonly db: LogsRepository) {}

	find = ({ offset, limit }) => this.db.findAll({ offset, limit })
}
