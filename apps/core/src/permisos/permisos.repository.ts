import { Injectable, Logger } from '@nestjs/common'
import { PermisoDTO } from '../app/dtos/permiso.dto'
import { InjectConnection, InjectModel } from '@nestjs/sequelize'
import { Permiso } from '../app/models/permiso.model'
import { CORE_DB } from '../app/dbs/coreDB.module'

@Injectable()
export class PermisosRepository {
	private readonly logger = new Logger('Permisos repository')

	constructor(
		@InjectModel(Permiso, CORE_DB)
		private permisoModel: typeof Permiso,
	) {}

	create(createPermisoDto: PermisoDTO) {
		return this.permisoModel.create(createPermisoDto)
	}

	findAll() {
		return `This action returns all permisos`
	}

	findOne(id: number) {
		return `This action returns a #${id} permiso`
	}

	remove(id: number) {
		return `This action removes a #${id} permiso`
	}
}
