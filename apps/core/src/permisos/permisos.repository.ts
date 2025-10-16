import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { Permiso } from '../app/models/permiso.model'

@Injectable()
export class PermisosRepository {
	private readonly logger = new Logger('Permisos repository')

	constructor(
		@InjectModel(Permiso, CORE_DB)
		private permisoModel: typeof Permiso,
	) {}

	create(createPermisoDto: any) {
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
