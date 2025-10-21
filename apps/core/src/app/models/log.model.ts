import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Usuario } from './usuario.model'

export enum LogType {
	CREATE = 'create',
	WRITE = 'write',
	DELETE = 'delete',
}

@Table({ tableName: 'logs' })
export class Log extends Model {
	@Column({
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	id: number

	@ForeignKey(() => Usuario)
	@Column({
		allowNull: false,
		type: DataType.INTEGER,
	})
	usuario_id: number

	@Column({
		type: DataType.STRING(120),
		allowNull: false,
	})
	descripcion: string

	@Column({
		type: DataType.ENUM(...Object.values(LogType)),
		allowNull: false,
	})
	tipo_log: LogType

	@Column({
		type: DataType.JSON,
		allowNull: true,
	})
	info: object

	@BelongsTo(() => Usuario, 'usuario_id')
	usuario: Usuario
}
