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

@Table({ tableName: 'modulos' })
export class Modulo extends Model<Modulo> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id: number

	@Column({ type: DataType.STRING, unique: true })
	nombre: string

	@HasMany(() => Permiso)
	permisos: Permiso[]

	@BeforeCreate
	@BeforeUpdate
	static lowercaseStrings(instance: Modulo) {
		Object.keys(instance.dataValues).forEach(key => {
			if (typeof instance[key] === 'string' && instance[key]) {
				instance[key] = instance[key].toLowerCase()
			}
		})
	}
}
