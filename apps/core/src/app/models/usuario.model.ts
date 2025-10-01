import {
	BeforeCreate,
	BeforeUpdate,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Permiso } from './permiso.model'

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING(15), unique: true, allowNull: false })
	cuil: string

	@Column({ type: DataType.STRING(120), unique: true, allowNull: false })
	nombre: string

	@Column({ type: DataType.STRING(120), unique: true, allowNull: false })
	email: string

	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@Column({
		type: DataType.DATE,
		allowNull: true,
		defaultValue: null,
	})
	ultimo_login: Date

	@HasMany(() => Permiso)
	permisos: Permiso[]

	@BeforeCreate
	@BeforeUpdate
	static lowercaseStrings(instance: Usuario) {
		Object.keys(instance.dataValues).forEach(key => {
			if (
				typeof instance[key] === 'string' &&
				instance[key] &&
				key !== 'password'
			) {
				instance[key] = instance[key].toLowerCase()
			}
		})
	}
}
