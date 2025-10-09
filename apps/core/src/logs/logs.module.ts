import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { CORE_DB } from '../app/dbs/coreDB.module'
import { Usuario } from '../app/models'
import { Log } from '../app/models/log.model'
import { AuthModule } from '../auth/auth.module'
import { LogsController } from './logs.controller'
import { LogsRepository } from './logs.repository'
import { LogsService } from './logs.service'

@Module({
	controllers: [LogsController],
	imports: [SequelizeModule.forFeature([Log, Usuario], CORE_DB), AuthModule],
	providers: [LogsService, LogsRepository],
	exports: [LogsRepository],
})
export class LogsModule {}
