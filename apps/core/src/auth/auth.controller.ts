import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '../app/utils/decorators'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Public()
	@UseGuards(AuthGuard('local'))
	@Post('login')
	login(@Request() req: any) {
		return this.authService.login(req.user)
	}

	@Get('refresh')
	@Public()
	refresh(@Request() req: any): object {
		return this.authService.refresh(req.headers.authorization)
	}


	@Post('logout')
	logout(@Request() request: Request) {
		return this.authService.logout(request.headers['authorization']);
	}
}
