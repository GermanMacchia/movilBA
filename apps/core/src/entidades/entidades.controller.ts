import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntidadesService } from './entidades.service';


@Controller('entidades')
export class EntidadesController {
  constructor(private readonly entidadesService: EntidadesService) {}

  @Get()
  findAll() {
    return this.entidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadesService.remove(+id);
  }
}
