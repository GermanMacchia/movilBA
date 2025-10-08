import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { PUBLIC_KEY } from '../../app/utils/decorators'

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (isPublic) return true

		return super.canActivate(context)
	}

	handleRequest(error: any, user: any) {
		if (error || !user) throw error || new UnauthorizedException()

		return user
	}
}
