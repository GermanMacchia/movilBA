import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TerminusModule } from '@nestjs/terminus'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { config } from './config'
import { SequelizeModule } from '@nestjs/sequelize'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerBehindProxyGuard } from './utils/throttle.guard'

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
		SequelizeModule.forRootAsync({
			name: 'core',
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get('database_co'),
		}),
		SequelizeModule.forRootAsync({
			name: 'entidades',
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get('database_re'),
		}),
		TerminusModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
	],
})
export class AppModule {}
