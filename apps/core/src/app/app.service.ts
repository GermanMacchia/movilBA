import { Injectable } from '@nestjs/common'
import { HealthCheckService } from '@nestjs/terminus'
import { DbHealthIndicator } from './utils/dbHealthIndicator'
import { MultiDbService } from './dbs/multi-db.service'
import { Sequelize } from 'sequelize'
import { InjectConnection } from '@nestjs/sequelize'
import { CORE_DB } from './dbs/coreDB.module'

@Injectable()
export class AppService {
	constructor(
		@InjectConnection(CORE_DB) private coreDb: Sequelize,
		private readonly health: HealthCheckService,
		private readonly multiDbService: MultiDbService,
	) {}

	async getHealth(allDatabases = false) {
		const coreDB = [
			{
				name: 'Core',
				db: async () => this.coreDb,
			},
		]

		const dbHealthIndicator = new DbHealthIndicator(
			allDatabases
				? [
						...coreDB,
						{
							name: 'Entidades',
							db: async () => this.multiDbService.getConnection('database_re'),
						},
					]
				: coreDB,
		)

		return this.health.check([
			() => dbHealthIndicator.checkHealth(allDatabases ? 'databases' : 'coreDB'),
		])
	}
}
