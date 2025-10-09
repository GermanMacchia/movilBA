import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Modulo } from './modulo.model'
import { Usuario } from './usuario.model'

@Table({ tableName: 'permisos' })
export class Permiso extends Model<Permiso> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id: number

	@ForeignKey(() => Usuario)
	@Column(DataType.INTEGER)
	usuario_id: number

	@ForeignKey(() => Modulo)
	@Column(DataType.INTEGER)
	modulo_id: number

	//-- bitmask: read=0001, write=0010, create=0100, delete=1000
	// 1111 Administrador
	// 0111 Editor
	// 0011 Operador
	// 0001 Auditor
	@Column({
		type: DataType.CHAR(4),
		allowNull: false,
		defaultValue: '0000',
		validate: {
			is4Bits(value: string) {
				if (!/^[01]{4}$/.test(value)) {
					throw new Error('Los permisos deben ser un string de 4 bits')
				}
			},
		},
	})
	permisos: string

	@BelongsTo(() => Usuario, 'usuario_id')
	usuario: Usuario

	@BelongsTo(() => Modulo, 'modulo_id')
	modulo: Modulo
}
