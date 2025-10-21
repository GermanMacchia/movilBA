import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from '@nestjs/common'

import { Observable, tap } from 'rxjs'
import { LogsRepository } from '../../logs/logs.repository'
import { LogType } from '../models/log.model'

@Injectable()
export class LogInterceptor implements NestInterceptor {
	constructor(
		private readonly logDb: LogsRepository,
		private descripcion: string,
		private tipo_log: LogType,
	) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		const req = context.switchToHttp().getRequest()
		const { id } = req.user
		const params = req.params
		const body = req.body
		let info = {}
		if (!this.descripcion || !this.tipo_log)
			throw new InternalServerErrorException('Args not found (log interceptor)')

		if (!id)
			throw new InternalServerErrorException('User not fount (log interceptor)')

		if (body && Object.keys(body).length) info['body'] = body
		if (params && Object.keys(params).length) info['params'] = params

		//Si la peticion es exitosa crea un registro de log
		return next.handle().pipe(
			tap(async data => {
				await this.logDb.createLog({
					usuario_id: id,
					descripcion: this.descripcion,
					info,
					tipo_log: this.tipo_log,
				})
				return data
			}),
		)
	}
}
