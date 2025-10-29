import { Injectable } from '@nestjs/common'
import { EntidadesRepository } from './entidades.repository'

@Injectable()
export class EntidadesService {
	constructor(private readonly entidadesRepository: EntidadesRepository) {}

	findAll = () => this.entidadesRepository.findEntidades()

	findVehiculosById = (id: number) => this.entidadesRepository.findVehiculos(id)

	findLineasById = (id: number) => this.entidadesRepository.findLineas(id)
}
