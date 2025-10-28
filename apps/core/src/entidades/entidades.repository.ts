import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import to from 'await-to-js'
import { QueryTypes } from 'sequelize'
import { handleException } from '../app/utils/handleException'
import { MultiDbService } from '../app/dbs/multi-db.service'

@Injectable()
export class EntidadesRepository {
	private readonly logger = new Logger('destino repository')

	constructor(private readonly multiDbService: MultiDbService) {}

	// const coreDb = await this.multiDbService.getConnection('CORE_DB');
	// const UserModel = coreDb.model('User');
	// const users = await UserModel.findAll({ limit: 10 });

	async findEntidades() {
		//cualquier error en la conexion esta controlado por db-exception
		const entidadesDB = await this.multiDbService.getConnection('database_re')

		const [error, data] = await to(
			entidadesDB.query('SELECT * FROM v_mba_empresas_operadoras', {
				type: QueryTypes.SELECT,
			}),
		)

		if (error)
			handleException(
				this.logger,
				'findEntidades error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	async findVehiculos(id: number) {
		//cualquier error en la conexion esta controlado por db-exception
		const entidadesDB = await this.multiDbService.getConnection('database_re')

		const [error, data] = await to(
			entidadesDB.query(
				'SELECT * FROM v_mba_vehiculos_por_entidad WHERE entidad_id = :id',
				{
					replacements: { id },
					type: QueryTypes.SELECT,
				},
			),
		)

		if (error)
			handleException(
				this.logger,
				'findVehiculos error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}

	async findLineas(id: number) {
		//cualquier error en la conexion esta controlado por db-exception
		const entidadesDB = await this.multiDbService.getConnection('database_re')

		const [error, data] = await to(
			entidadesDB.query(
				'SELECT * FROM v_mba_lineas_entidad_detalle WHERE entidad_id = :id',
				{
					replacements: { id },
					type: QueryTypes.SELECT,
				},
			),
		)

		if (error)
			handleException(
				this.logger,
				'findLineas error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'Internal Server Error' },
			)

		return data
	}
}
