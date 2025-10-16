import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

export const ENTIDADES_DB = 'entidades'

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			name: ENTIDADES_DB,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get('database_re'),
		}),
	],
	exports: [SequelizeModule],
})
export class EntidadesDBModule {}
