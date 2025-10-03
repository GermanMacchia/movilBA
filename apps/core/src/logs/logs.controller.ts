import { Controller, Get, Query } from '@nestjs/common';

import { Modulos, Permissions } from '../app/interfaces';
import { RequireMask, RequireModule } from '../app/utils/decorators';
import { LogsService } from './logs.service';

@Controller('logs')
@RequireModule(Modulos.PERMISOS)
export class LogsController {
	constructor(private readonly logsService: LogsService) { }

	@Get()
	@RequireMask([Permissions.READ])
	findAll(
		@Query('limit') limitStr: string,
		@Query('offset') offsetStr: string,
	) {
		const limit = parseInt(limitStr) || 50;
		const offset = parseInt(offsetStr) || 0;
		return this.logsService.find({ limit, offset });
	}
}
