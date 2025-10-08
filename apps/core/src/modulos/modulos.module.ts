import { Module } from '@nestjs/common'
import { ModulosController } from './modulos.controller'
import { ModulosService } from './modulos.service'
import { ModulosRespository } from './modulos.repository'
import { SequelizeModule } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Modulo } from '../app/models'

@Module({
	controllers: [ModulosController],
	imports: [SequelizeModule.forFeature([Modulo], CORE_DB)],
	providers: [ModulosService, ModulosRespository],
})
export class ModulosModule {}
