import { UnauthorizedException } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'cuil', passwordField: 'password' })
	}

	async validate(cuil: string, password: string) {
		const user = await this.authService.validateUser(cuil, password)
		if (!user) throw new UnauthorizedException()

		return user
	}
}
