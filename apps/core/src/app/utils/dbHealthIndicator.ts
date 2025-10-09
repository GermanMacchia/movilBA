import { Logger } from '@nestjs/common'
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus'
import { Sequelize } from 'sequelize'

export class DbHealthIndicator {
	private readonly logger: Logger

	constructor(
		private dbConections: { name: string; db: Sequelize }[],
		private readonly healthIndicatorService: HealthIndicatorService,
	) {
		this.logger = new Logger('DB Health Indicator')
	}

	async checkHealth(key: string): Promise<HealthIndicatorResult> {
		const indicator = this.healthIndicatorService.check(key)
		const errors: string[] = []

		for (const connection of this.dbConections) {
			try {
				await connection.db.authenticate()
			} catch (error) {
				this.logger.error(error.message)
				errors.push(`Error en ${connection.name}: ${error.message}`)
			}
		}

		if (errors.length) {
			return indicator.down({
				message: 'Errores en conexiones de base de datos',
				errors: errors,
			})
		}

		return indicator.up({
			message: 'Todas las conexiones están funcionando correctamente',
		})
	}
}
