import { IsDefined, IsNumber, IsString, Min } from 'class-validator'

export class PermisoDTO {
	@IsNumber()
	@IsDefined()
	@Min(1)
	modulo_id: number

	@IsNumber()
	@IsDefined()
	@Min(1)
	usuario_id: number

	@IsString()
	@IsDefined()
	permisos: string
}
