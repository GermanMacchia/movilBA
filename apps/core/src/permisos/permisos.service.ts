import { Injectable } from '@nestjs/common'
import { PermisoDTO } from '../app/dtos/permiso.dto'
import { PermisosRepository } from './permisos.repository'

@Injectable()
export class PermisosService {
	constructor(private permisosRepository: PermisosRepository) {}

	create = (createPermisoDto: PermisoDTO) =>
		this.permisosRepository.create(createPermisoDto)

	remove = (id: number) => this.permisosRepository.remove(id)
}
