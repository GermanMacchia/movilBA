import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { config } from './config'

import { AuthModule } from '../auth/auth.module'
import { EntidadesModule } from '../entidades/entidades.module'
import { LogsModule } from '../logs/logs.module'
import { ModulosModule } from '../modulos/modulos.module'
import { PermisosModule } from '../permisos/permisos.module'
import { UsuariosModule } from '../usuarios/usuarios.module'
import { CoreDBModule } from './dbs/coreDB.module'
import { EntidadesDBModule } from './dbs/entidadesDB.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [config],
		}),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get('cache'),
			isGlobal: true,
		}),
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) =>
				config.get('throttle.active')
					? config.get('throttle.list')
					: [{ ttl: 0, limit: 0 }],
		}),
		TerminusModule,
		EntidadesDBModule,
		CoreDBModule,
		AuthModule,
		LogsModule,
		UsuariosModule,
		EntidadesModule,
		ModulosModule,
		PermisosModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
