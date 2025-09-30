import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

export const CORE_DB = 'core'
export const DB_TIMESTAMPS = ['deleted_at', 'updated_at', 'created_at']

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			name: CORE_DB,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get('database_co'),
		}),
	],
	exports: [SequelizeModule],
})
export class CoreDBModule {}
