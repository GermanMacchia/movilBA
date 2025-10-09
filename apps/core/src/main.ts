/* eslint-disable @nx/enforce-module-boundaries */

import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import passport from 'passport'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger('Main')

	app.set('trust proxy', 2)

	//xXssProtection deprecado
	app.use(
		helmet({
			xXssProtection: false,
		}),
	)
	app.enableCors(config.get('app.cors'))

	app.use(passport.initialize())

	app.setGlobalPrefix(config.get('app.rootPath'))

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	)

	await app.listen(config.get('app.port'))

	logger.log('App started on ' + (await app.getUrl()))

	if (!config.get('throttle.active')) logger.warn('Throttle OFF')
}

bootstrap()
