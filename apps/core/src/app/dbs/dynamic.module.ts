// database.module.ts
import { DynamicModule, Module, Logger } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MultiDbService } from './multi-db.service'

@Module({})
export class DatabaseModule {
	static forDatabases(dbNames: string[]): DynamicModule {
		const imports = dbNames.map(dbName =>
			SequelizeModule.forRootAsync({
				name: dbName,
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: async (config: ConfigService) => {
					const dbConfig = config.get(dbName)
					try {
						return dbConfig
					} catch (err) {
						//evita que caiga la aplicación al iniciar
						Logger.error(`No se pudo inicializar ${dbName}: ${err.message}`)
						return {
							dialect: dbConfig.dialect,
							host: dbConfig.host,
							username: dbConfig.username,
							password: dbConfig.password,
							database: dbConfig.database,
						}
					}
				},
			}),
		)

		return {
			module: DatabaseModule,
			imports,
			providers: [MultiDbService],
			exports: [MultiDbService],
		}
	}
}
