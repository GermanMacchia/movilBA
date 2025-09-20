import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class EntidadesRepository {

    private readonly logger = new Logger('destino repository')

    constructor(private readonly sequelize: Sequelize) { }

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
