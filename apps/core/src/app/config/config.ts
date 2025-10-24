import { Logger } from '@nestjs/common'

import { Dialect } from 'sequelize'
import { envVars } from './envs'

const logCO = (msj: string): void => new Logger('CO Sequelize DB').debug(msj)
const logRE = (msj: string): void => new Logger('RE Sequelize DB').debug(msj)
const splitCors = (cors: string) => (cors === '*' ? '*' : cors.split(','))

export const config = () => ({
	app: {
		port: envVars.APP_PORT,
		host: envVars.APP_HOST,
		rootPath: envVars.ROOT_PATH,
		jwt: {
			secret: envVars.JWT_SECRET,
			expire: envVars.JWT_EXPIRE,
		},
		cors: {
			origin: splitCors(envVars.APP_CORS),
			methods: 'GET,POST,PUT,DELETE',
		},
	},
	database_co: {
		dialect: envVars.DB_CO_DIALECT as Dialect,
		host: envVars.DB_CO_HOST,
		port: envVars.DB_CO_PORT,
		database: envVars.DB_CO_DATABASE,
		username: envVars.DB_CO_USER,
		password: envVars.DB_CO_PASS,
		timezone: envVars.DB_CO_TIMEZONE,
		logging: envVars.DB_CO_LOG ? logCO : false,
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
		retry: { max: 3 },
		dialectOptions: { connectTimeout: 10000 },
		autoLoadModels: true,
		synchronize: true,
		define: {
			schema: envVars.DB_CO_SCHEMA,
			underscored: true,
			paranoid: true,
			timestamps: true,
		},
	},
	database_re: {
		dialect: envVars.DB_RE_DIALECT as Dialect,
		host: envVars.DB_RE_HOST,
		port: envVars.DB_RE_PORT,
		database: envVars.DB_RE_DATABASE,
		username: envVars.DB_RE_USER,
		password: envVars.DB_RE_PASS,
		timezone: envVars.DB_RE_TIMEZONE,
		logging: envVars.DB_RE_LOG ? logRE : false,
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
		retry: { max: 3 },
		dialectOptions: { connectTimeout: 10000 },
		autoLoadModels: false,
		define: {
			schema: envVars.DB_RE_SCHEMA,
		},
	},
	cache: {
		store: 'memory',
		isGlobal: true,
		ttl: envVars.CACHE_TTL,
		max: envVars.CACHE_MAX,
	},
	throttle: {
		active: envVars.THROTTLE_ACTIVE,
		list: [
			{
				ttl: envVars.THROTTLE_TTL,
				limit: envVars.THROTTLE_LIMIT,
			},
		],
	},
})
