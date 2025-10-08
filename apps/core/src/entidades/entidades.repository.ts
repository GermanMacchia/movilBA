import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/sequelize'
import to from 'await-to-js'
import { QueryTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { ENTIDADES_DB } from '../app/dbs/entidadesDB.module'
import { handleException } from '../app/utils/handleException'

@Injectable()
export class EntidadesRepository {
    private readonly logger = new Logger('destino repository')

    constructor(
        @InjectConnection(ENTIDADES_DB)
        private readonly sequelize: Sequelize
    ) { }

    async findEntidades() {
        const [error, data] = await to(
            this.sequelize.query(
                'SELECT * FROM v_mba_empresas_operadoras',
                { type: QueryTypes.SELECT, }
            )
        )

        if (error)
            handleException(
                this.logger,
                'findEntidades error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                { name: 'error', message: 'internal Server Error' }
            )

        return data
    }

    findOne(id: number) {
        return `This action returns a #${id} entidade`
    }

    remove(id: number) {
        return `This action removes a #${id} entidade`
    }
}
