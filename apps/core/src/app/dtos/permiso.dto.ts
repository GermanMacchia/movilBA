import { IsDefined, IsNumber, Max, MaxLength } from 'class-validator'

export class PermisoDTO {
	@IsNumber()
	@IsDefined()
	modulo_id: number

	@IsNumber()
	@IsDefined()
	usuario_id: number

	@IsNumber()
	@IsDefined()
	@Max(1111)
	permisos: number
}
