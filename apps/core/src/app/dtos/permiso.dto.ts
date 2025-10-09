import { IsDefined, IsNumber, IsString } from 'class-validator'

export class PermisoDTO {
	@IsNumber()
	@IsDefined()
	modulo_id: number

	@IsNumber()
	@IsDefined()
	usuario_id: number

	@IsString()
	@IsDefined()
	permisos: string
}
