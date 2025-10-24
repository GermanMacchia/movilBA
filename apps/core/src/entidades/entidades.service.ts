import { Injectable } from '@nestjs/common'
import { EntidadesRepository } from './entidades.repository'

@Injectable()
export class EntidadesService {
	constructor(private readonly entidadesRepository: EntidadesRepository) {}

	findAll = () => this.entidadesRepository.findEntidades()
}
