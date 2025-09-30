import { Module } from '@nestjs/common'
import { PermisosService } from './permisos.service'
import { PermisosController } from './permisos.controller'
import { PermisosRepository } from './permisos.repository'
import { SequelizeModule } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Permiso } from '../app/models'

@Module({
	controllers: [PermisosController],
	imports: [SequelizeModule.forFeature([Permiso], CORE_DB)],
	providers: [PermisosService, PermisosRepository],
})
export class PermisosModule {}
