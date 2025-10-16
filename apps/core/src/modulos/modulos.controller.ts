import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ModuloDTO } from '../app/dtos/modulo.dto'
import { Modulos } from '../app/interfaces'
import { RequireModule } from '../app/utils/decorators'
import { ModulosService } from './modulos.service'

@Controller('modulos')
@RequireModule(Modulos.PERMISOS)
export class ModulosController {
	constructor(private readonly modulosService: ModulosService) {}

	@Post()
	create(@Body() createModuloDto: ModuloDTO) {
		return this.modulosService.create(createModuloDto)
	}

	@Get()
	findAll() {
		return this.modulosService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.modulosService.findOne(+id)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.modulosService.remove(+id)
	}
}
