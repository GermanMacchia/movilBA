/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/sequelize'
import { HealthCheckService, HealthIndicatorService } from '@nestjs/terminus'
import { Sequelize } from 'sequelize'
import { DbHealthIndicator } from './utils/dbHealthIndicator'
import { CORE_DB } from './dbs/coreDB.module'
import { ENTIDADES_DB } from './dbs/entidadesDB.module'

@Injectable()
export class AppService {
	constructor(
		@InjectConnection(CORE_DB) private coreDb: Sequelize,
		@InjectConnection(ENTIDADES_DB) private entidadesDb: Sequelize,
		private health: HealthCheckService,
		private healthIndicator: HealthIndicatorService,
	) {}

	async getHealth(): Promise<any> {
		const dbHealthIndicator = new DbHealthIndicator(
			[
				{ name: 'Core', db: this.coreDb },
				{ name: 'Entidades', db: this.entidadesDb },
			],
			this.healthIndicator,
		)
		return await this.health.check([
			() => dbHealthIndicator.checkHealth('databases'),
		])
	}
}
