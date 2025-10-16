import { Injectable } from '@nestjs/common'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { ModulosRespository } from './modulos.repository'

@Injectable()
export class ModulosService {
	constructor(private modulosRepository: ModulosRespository) {}

	create(createPermisoDto: ModuloDTO) {
		return this.modulosRepository.create(createPermisoDto)
	}

	findAll() {
		return this.modulosRepository.findAll()
	}

	findOne(id: number) {
		return `This action returns a #${id} permiso`
	}

	remove(id: number) {
		return `This action removes a #${id} permiso`
	}
}
