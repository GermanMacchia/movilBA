import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { PermisosGuard } from '../../auth/guards/permisos.guard'

export const ALLOWED_ROLES = 'AllowedRoles'
export const PUBLIC_KEY = 'Public'
export const CACHED_KEY = 'Cached'

// export const AllowedRoles = (...roles: string[]) => SetMetadata(ALLOWED_ROLES, roles);

export const Public = () => SetMetadata(PUBLIC_KEY, true)

// export function Auth(...roles: string[]) {
// 	return applyDecorators(AllowedRoles(...roles), UseGuards(PermisosGuard));
// }

// export function IncludeLog(descripcion: string, tipo_log: LogType) {
// 	return applyDecorators(
// 		UseInterceptors(
// 			new LogInterceptor(new LogsRepository(Log), descripcion, tipo_log),
// 		),
// 	);
// }
