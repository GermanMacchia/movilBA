import { Logger } from '@nestjs/common'
import {
	HealthIndicatorResult,
	HealthIndicator,
	HealthCheckError,
} from '@nestjs/terminus'
import { Sequelize } from 'sequelize'

export class DbHealthIndicator extends HealthIndicator {
	private readonly logger: Logger

	constructor(
		private dbConections: { name: string; db: () => Promise<Sequelize> }[],
	) {
		super()
		this.logger = new Logger('DB Health Indicator')
	}

	async checkHealth(key: string): Promise<HealthIndicatorResult> {
		const errors: string[] = []

		for (const connection of this.dbConections) {
			try {
				;(await connection.db()).authenticate()
			} catch (error) {
				this.logger.error(error.message)
				errors.push(`Error en ${connection.name}`)
			}
		}

		if (errors.length) {
			throw new HealthCheckError(
				'Error en conexion de base de datos',
				this.getStatus(key, false),
			)
		}

		return this.getStatus(key, true)
	}
}
