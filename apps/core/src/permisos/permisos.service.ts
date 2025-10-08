import { Injectable } from '@nestjs/common'
import { PermisoDTO } from '../app/dtos/permiso.dto'
import { PermisosRepository } from './permisos.repository'

@Injectable()
export class PermisosService {
	constructor(private permisosRepository: PermisosRepository) {}

	create(createPermisoDto: PermisoDTO) {
		return this.permisosRepository.create(createPermisoDto)
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
