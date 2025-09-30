import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PermisosService } from './permisos.service'
import { PermisoDTO } from '../app/dtos/permiso.dto'

@Controller('permisos')
export class PermisosController {
	constructor(private readonly permisosService: PermisosService) {}

	@Post()
	create(@Body() createPermisoDto: PermisoDTO) {
		return this.permisosService.create(createPermisoDto)
	}

	@Get()
	findAll() {
		return this.permisosService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.permisosService.findOne(+id)
	}


	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.permisosService.remove(+id)
	}
}
