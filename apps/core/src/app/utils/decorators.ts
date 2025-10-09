import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common'
import { LogsRepository } from '../../logs/logs.repository'
import { LogInterceptor } from '../interceptors/log.interceptor'
import { Log, LogType } from '../models/log.model'

export const PUBLIC_KEY = 'Public'
export const CACHED_KEY = 'Cached'
export const REQUIRED_MODULE = 'RequiredModule'
export const REQUIRED_MASK = 'RequiredMask'

export const RequireModule = (modulo: string) =>
	SetMetadata(REQUIRED_MODULE, { modulo })

export const RequireMask = (mask: number[]) => SetMetadata(REQUIRED_MASK, { mask })

export const Public = () => SetMetadata(PUBLIC_KEY, true)

export function RegisterLog(descripcion: string, tipo_log: LogType) {
	return applyDecorators(
		UseInterceptors(
			new LogInterceptor(new LogsRepository(Log), descripcion, tipo_log),
		),
	)
}
