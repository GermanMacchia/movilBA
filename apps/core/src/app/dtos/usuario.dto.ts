import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'

export class UsuarioCreateDTO {
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
}

export class UsuarioEditDTO {
	@IsString()
	@IsOptional()
	cuil: string

	@IsString()
	@IsOptional()
	nombre: string

	@IsString()
	@IsOptional()
	@IsEmail()
	email: string
}
