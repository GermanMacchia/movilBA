import { Injectable } from '@nestjs/common';
import { EntidadesRepository } from './entidades.repository';


@Injectable()
export class EntidadesService {
  constructor(private readonly entidadesRepository: EntidadesRepository){}
  
  findAll() {
    return `This action returns all entidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} entidade`;
  }
}
