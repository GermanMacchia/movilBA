import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ModulosService } from './modulos.service'
import { ModuloDTO } from '../app/dtos/modulo.dto'

@Controller('modulos')
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
