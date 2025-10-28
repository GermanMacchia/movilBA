import { Injectable } from '@nestjs/common'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { ModulosRespository } from './modulos.repository'

@Injectable()
export class ModulosService {
	constructor(private modulosRepository: ModulosRespository) {}

	create = (createPermisoDto: ModuloDTO) =>
		this.modulosRepository.create(createPermisoDto)

	findAll = () => this.modulosRepository.findAll()
}
