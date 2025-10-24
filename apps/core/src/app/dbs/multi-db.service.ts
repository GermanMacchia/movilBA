import { Injectable, Logger } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import {
	ConnectionError,
	ConnectionRefusedError,
	ConnectionTimedOutError,
} from 'sequelize'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MultiDbService {
	private readonly logger = new Logger(MultiDbService.name)
	private connections = new Map<string, Sequelize>()

	constructor(private config: ConfigService) {}

	/**
	 * Devuelve la conexión Sequelize para la DB solicitada
	 * Si no existe o está caída, intenta reconectar
	 */
	async getConnection(dbName: string): Promise<Sequelize> {
		let sequelize = this.connections.get(dbName)

		// Si ya existe, verificamos si sigue viva
		if (sequelize) {
			try {
				await sequelize.authenticate()
				return sequelize
			} catch (err) {
				this.logger.warn(`Conexión perdida con ${dbName}, intentando reconectar...`)
			}
		}

		// Si no existe o falló -> reconectamos
		return await this.reconnect(dbName)
	}

	/**
	 * Intenta reconectar hasta 2 veces con delay
	 */
	private async reconnect(dbName: string): Promise<Sequelize> {
		const config = this.config.get(dbName)
		let retries = 2

		while (retries > 0) {
			try {
				const sequelize = new Sequelize(config)
				await sequelize.authenticate()
				this.connections.set(dbName, sequelize)
				this.logger.log(`Conectado correctamente a ${dbName}`)
				return sequelize
			} catch (err) {
				if (
					err instanceof ConnectionError ||
					err instanceof ConnectionRefusedError ||
					err instanceof ConnectionTimedOutError
				) {
					this.logger.warn(
						`Fallo al conectar ${dbName}, reintentos restantes: ${retries - 1}`,
					)
				} else {
					this.logger.error(`Error inesperado en ${dbName}: ${err.message}`)
				}
				retries--
				if (retries === 0) throw err
				await new Promise(r => setTimeout(r, 2500)) // espera 2.5s antes de reintentar
			}
		}

		throw new Error(`No se pudo conectar a ${dbName}`)
	}
}
