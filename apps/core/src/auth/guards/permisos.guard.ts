import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
	PUBLIC_KEY,
	REQUIRED_MASK,
	REQUIRED_MODULE,
} from '../../app/utils/decorators'
import { UsuarioRepository } from '../../usuarios/usuarios.repository'
import { AuthService } from '../auth.service'

@Injectable()
export class PermisosGuard implements CanActivate {
	private toMask = (permission: number): number =>
		/^[01]+$/.test(String(permission)) ? parseInt(String(permission), 2) : permission

	constructor(
		private reflector: Reflector,
		private authService: AuthService,
		private usuarioRepository: UsuarioRepository,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		//busca en tanto en controllador como en el handler
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			ctx.getHandler(),
			ctx.getClass(),
		])

		if (isPublic) return true

		const req = ctx.switchToHttp().getRequest()
		const token = req.headers['authorization'] as string | undefined
		const isBlackListed = await this.authService.isTokenBlackListed(token)

		//chequear si se hizo logout
		if (token && isBlackListed) throw new ForbiddenException()

		//chequear permisos de usuario
		const cuil = req.user.cuil
		const usuario = await this.usuarioRepository.findByCuil(cuil)
		if (!usuario) throw new UnauthorizedException()

		//chequear restricciones de modulo
		const reqMod = this.reflector.getAllAndOverride<{ modulo: string } | undefined>(
			REQUIRED_MODULE,
			[ctx.getHandler(), ctx.getClass()],
		)

		if (!reqMod) return true

		//chequear si usuario tiene permisos para el modulo
		const entry = usuario.permisos.find(p => p.modulo?.nombre === reqMod.modulo)
		if (!entry) throw new ForbiddenException()

		//busca en el handler restricciones específicas
		const reqMask = this.reflector.get<{ mask: number[] } | undefined>(
			REQUIRED_MASK,
			ctx.getHandler(),
		)

		if (!req.mask || !req.mask.length) return true

		const userMaskedPermissions = this.toMask(entry.permisos)

		//si algunas de las restricciones no se cumple
		let allowed = true
		for (let idx = 0; idx < reqMask.mask.length; idx++) {
			if (this.toMask(reqMask.mask[idx]) !== userMaskedPermissions) allowed = false
		}

		if (!allowed) throw new ForbiddenException()

		return true
	}
}
