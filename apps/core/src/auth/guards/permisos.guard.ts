import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ALLOWED_ROLES, PUBLIC_KEY } from '../../app/utils/decorators'
import { AuthService } from '../auth.service'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class PermisosGuard extends AuthGuard('jwt') {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService
	) {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (isPublic) return true

		const validRoles: String[] = this.reflector.get(
			ALLOWED_ROLES,
			context.getHandler()
		)
		// const req = context.switchToHttp().getRequest();
		// const token = req.headers['authorization'].replace(/^Bearer\s/, '');
		// const user: Usuario = await this.authService.decodeUsuario(token);

		// Agrego el dato para ser consumido en el interceptor
		// req.user = user;

		// if (!(await this.authService.validate(token))) throw new ForbiddenException();

		// if (validRoles.length === 0) return true;

		//TODO AGREGAR LOGICA DE PERMISOS
		// if (!validRoles.includes(user.permisos)) throw new ForbiddenException();

		return true
	}
}
