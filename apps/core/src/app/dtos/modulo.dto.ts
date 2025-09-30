import { IsDefined, IsString } from 'class-validator'

export class ModuloDTO {
	@IsString()
	@IsDefined()
	nombre: string
}
