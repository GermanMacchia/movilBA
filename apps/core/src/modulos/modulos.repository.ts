import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CORE_DB } from '../app/dbs/coreDB.module'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { Modulo } from '../app/models/modulo.model'

@Injectable()
export class ModulosRespository {
	private readonly logger = new Logger('Modulos repository')

	constructor(
		@InjectModel(Modulo, CORE_DB)
		private moduloModel: typeof Modulo
	) {}

	create(createPermisoDto: ModuloDTO) {
		return this.moduloModel.create(createPermisoDto)
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
