import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { UsuariosModule } from '../usuarios/usuarios.module'
import { jwtAuthGuard } from './guards/jwt.guard'
import { PermisosGuard } from './guards/permisos.guard'
import { ThrottlerBehindProxyGuard } from './guards/throttle.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	controllers: [AuthController],
	//orden de los guards es relevante
	providers: [
		AuthService,
		ConfigService,
		JwtStrategy,
		LocalStrategy,
		{
			provide: APP_GUARD,
			useClass: ThrottlerBehindProxyGuard,
		},
		{
			provide: APP_GUARD,
			useClass: jwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PermisosGuard,
		},
	],
	imports: [
		PassportModule,
		UsuariosModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('app.jwt.secret'),
				signOptions: {
					expiresIn: configService.get<number>('app.jwt.expire'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [AuthService],
})
export class AuthModule { }
