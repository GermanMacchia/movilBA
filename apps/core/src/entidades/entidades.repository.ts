import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/sequelize'
import to from 'await-to-js'
import { QueryTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { handleException } from '../app/utils/handleException'
import { ENTIDADES_DB } from '../app/dbs/entidadesDB.module'

@Injectable()
export class EntidadesRepository {
	private readonly logger = new Logger('destino repository')

	constructor(
		@InjectConnection(ENTIDADES_DB)
		private readonly sequelize: Sequelize
	) {}

	async findEntidades() {
		const [error, data] = await to(
			this.sequelize.query(
				`
            SELECT 
                e.id,
                e.nombre,
                e.nombre_corto,
                e.razon_social,
                e.cuit,
                te.nombre_mostrable as tipo_entidad,
                

                COALESCE(lineas_stats.total_lineas, 0) as total_lineas,
                COALESCE(lineas_stats.total_ramales, 0) as total_ramales,
                COALESCE(vehiculos_stats.total_vehiculos, 0) as total_vehiculos,
                COALESCE(personas_stats.total_personas, 0) as total_personas,
                
                CASE 
                    WHEN lineas_stats.total_lineas > 0 THEN 'Operador de Transporte'
                    WHEN vehiculos_stats.total_vehiculos > 0 THEN 'Propietario de Vehículos'
                    WHEN personas_stats.total_personas > 0 THEN 'Con Personal Asociado'
                    ELSE 'Registro Básico'
                END as estado_operacional,
            

                COALESCE(telefonos_json.telefonos, '[]'::json) as telefonos,

                COALESCE(correos_json.correos, '[]'::json) as correos,

                contacto_principal.telefono_principal,
                contacto_principal.email_principal

            FROM entidades e
            LEFT JOIN opciones te ON e.tipo_entidad_id = te.id

            LEFT JOIN (
                SELECT 
                    l.entidad_id,
                    COUNT(DISTINCT l.id) as total_lineas,
                    COUNT(DISTINCT r.id) as total_ramales
                FROM lineas l
                LEFT JOIN ramales r ON l.id = r.linea_id
                GROUP BY l.entidad_id
            ) lineas_stats ON e.id = lineas_stats.entidad_id

            LEFT JOIN (
                SELECT 
                    entidad_id,
                    COUNT(*) as total_vehiculos
                FROM vehiculos 
                WHERE entidad_id IS NOT NULL
                GROUP BY entidad_id
            ) vehiculos_stats ON e.id = vehiculos_stats.entidad_id

            LEFT JOIN (
                SELECT 
                    aep.entidad_id,
                    COUNT(*) as total_personas
                FROM asociaciones_entidad_persona aep
                JOIN personas p ON aep.persona_id = p.id
                GROUP BY aep.entidad_id
            ) personas_stats ON e.id = personas_stats.entidad_id

            LEFT JOIN (
                SELECT 
                    nt.entidad_id,
                    json_agg(
                        json_build_object(
                            'id', nt.id,
                            'numero', nt.numero_telefono,
                            'tipo_telefono', tt.nombre_mostrable,
                            'es_primario', nt.es_primario,
                            'observaciones', nt.observaciones
                        ) ORDER BY nt.es_primario DESC, nt.id
                    ) as telefonos
                FROM numeros_telefonicos nt
                LEFT JOIN opciones tt ON nt.tipo_telefono_id = tt.id
                WHERE nt.entidad_id IS NOT NULL
                GROUP BY nt.entidad_id
            ) telefonos_json ON e.id = telefonos_json.entidad_id

            LEFT JOIN (
                SELECT 
                    ce.entidad_id,
                    json_agg(
                        json_build_object(
                            'id', ce.id,
                            'correo', ce.correo,
                            'tipo_correo', tc.nombre_mostrable,
                            'es_primario', ce.es_primario,
                            'observaciones', ce.observaciones
                        ) ORDER BY ce.es_primario DESC, ce.id
                    ) as correos
                FROM correos_electronicos ce
                LEFT JOIN opciones tc ON ce.tipo_correo_id = tc.id
                WHERE ce.entidad_id IS NOT NULL
                GROUP BY ce.entidad_id
            ) correos_json ON e.id = correos_json.entidad_id

            LEFT JOIN (
                SELECT 
                    e2.id as entidad_id,
                    (SELECT numero_telefono FROM numeros_telefonicos WHERE entidad_id = e2.id AND es_primario = true LIMIT 1) as telefono_principal,
                    (SELECT correo FROM correos_electronicos WHERE entidad_id = e2.id AND es_primario = true LIMIT 1) as email_principal
                FROM entidades e2
            ) contacto_principal ON e.id = contacto_principal.entidad_id

            ORDER BY 
                CASE 
                    WHEN lineas_stats.total_lineas > 0 THEN 1
                    WHEN vehiculos_stats.total_vehiculos > 0 THEN 2
                    WHEN personas_stats.total_personas > 0 THEN 3
                    ELSE 4
                END,
                e.nombre;
        `,
				{
					type: QueryTypes.SELECT,
				}
			)
		)

		if (error) {
			this.logger.error(error)
			handleException(
				this.logger,
				'findEntidades error',
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ name: 'error', message: 'internal Server Error' }
			)
		}
		return data
	}

	findOne(id: number) {
		return `This action returns a #${id} entidade`
	}

	remove(id: number) {
		return `This action removes a #${id} entidade`
	}
}
