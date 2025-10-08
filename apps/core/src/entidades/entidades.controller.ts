import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Modulos, Permissions } from '../app/interfaces';

import { RequireMask, RequireModule } from '../app/utils/decorators';
import { EntidadesService } from './entidades.service';

@Controller('entidades')
@RequireModule(Modulos.RUTAP)
export class EntidadesController {
  constructor(
    private readonly entidadesService: EntidadesService
  ) { }

  @Get()
  @RequireMask([Permissions.READ])
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
