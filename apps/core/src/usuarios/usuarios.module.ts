import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Modulo } from '../app/models/modulo.model'
import { Permiso } from '../app/models/permiso.model'
import { Usuario } from '../app/models/usuario.model'
import { UsuariosController } from './usuarios.controller'
import { UsuarioRepository } from './usuarios.repository'
import { UsuariosService } from './usuarios.service'

@Module({
	controllers: [UsuariosController],
	providers: [UsuariosService, UsuarioRepository],
	imports: [SequelizeModule.forFeature([Usuario, Permiso, Modulo], CORE_DB)],
	exports: [UsuarioRepository],
})
export class UsuariosModule { }
