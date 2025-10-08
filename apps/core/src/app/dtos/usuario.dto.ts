import { IsBoolean, IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'

export class UsuarioDTO {
	@IsString()
	@IsDefined()
	cuil: string

	@IsString()
	@IsDefined()
	nombre: string

	@IsString()
	@IsDefined()
	password: string

	@IsString()
	@IsDefined()
	@IsEmail()
	email: string

	@IsOptional()
	@IsBoolean()
	activo: boolean
}
