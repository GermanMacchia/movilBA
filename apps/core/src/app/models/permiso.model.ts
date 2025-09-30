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
	@Column(DataType.INTEGER({ length: 4 }))
	permisos: number

	@BelongsTo(() => Usuario, 'id')
	usuario: Usuario

	@BelongsTo(() => Modulo, 'id')
	modulo: Modulo
}
