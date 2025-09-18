/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { HealthCheckService, HealthIndicatorService } from '@nestjs/terminus'
import { Sequelize } from 'sequelize'
import { DbHealthIndicator } from './utils/dbHealthIndicator'
import { InjectConnection } from '@nestjs/sequelize'

@Injectable()
export class AppService {
	constructor(
		@InjectConnection('core') private coreDb: Sequelize,
		@InjectConnection('entidades') private entidadesDb: Sequelize,
		private health: HealthCheckService,
		private healthIndicator: HealthIndicatorService
	) {}

	async getHealth(): Promise<any> {
		const dbHealthIndicator = new DbHealthIndicator([
			{name: 'Core', db: this.coreDb},
			{name: 'Entidades', db: this.entidadesDb}],
			this.healthIndicator
		)
		return await this.health.check([
			() => dbHealthIndicator.checkHealth('databases'),
		])
	}
}
