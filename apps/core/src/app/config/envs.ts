import * as dotenv from 'dotenv'
import * as joi from 'joi'

dotenv.config()

export interface EnvVars {
	APP_PORT: number
	APP_HOST: string
	APP_CORS: string
	ROOT_PATH: string
	CACHE_MAX: number
	CACHE_TTL: number
	THROTTLE_ACTIVE: boolean
	THROTTLE_TTL: number
	THROTTLE_LIMIT: number
	// DB_CO_DIALECT: string
	// DB_CO_HOST: string
	// DB_CO_PORT: number
	// DB_CO_USER: string
	// DB_CO_PASS: string
	// DB_CO_DATABASE: string
	// DB_CO_LOG: boolean
	// DB_CO_TIMEZONE: string
	DB_RE_DIALECT: string
	DB_RE_HOST: string
	DB_RE_PORT: number
	DB_RE_USER: string
	DB_RE_PASS: string
	DB_RE_DATABASE: string
	DB_RE_LOG: boolean
	DB_RE_TIMEZONE: string
}

export const envsSchema = joi
	.object({
		APP_PORT: joi.number().default(8080),
		APP_HOST: joi.string().default('0.0.0.0'),
		APP_CORS: joi.string().default('*'),
		ROOT_PATH: joi.string().default('api'),
		CACHE_MAX: joi.number().default(100),
		CACHE_TTL: joi.number().default(60000),
		THROTTLE_ACTIVE: joi.boolean().default(true),
		THROTTLE_TTL: joi.number().default(30000),
		THROTTLE_LIMIT: joi.number().default(5),
		// DB_CO_DIALECT: joi.string().default('mariadb'),
		// DB_CO_HOST: joi.string().required(),
		// DB_CO_PORT: joi.number().default(3306),
		// DB_CO_USER: joi.string().required(),
		// DB_CO_PASS: joi.string().required(),
		// DB_CO_DATABASE: joi.string().required(),
		// DB_CO_LOG: joi.boolean().default(true),
		// DB_CO_TIMEZONE: joi.string().default('-03:00'),
		DB_RE_DIALECT: joi.string().default('mariadbmusi'),
		DB_RE_HOST: joi.string().required(),
		DB_RE_PORT: joi.number().default(3306),
		DB_RE_USER: joi.string().required(),
		DB_RE_PASS: joi.string().required(),
		DB_RE_DATABASE: joi.string().required(),
		DB_RE_LOG: joi.boolean().default(true),
		DB_RE_TIMEZONE: joi.string().default('-03:00'),
	})
	.unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
	throw new Error(`Config validation error: ${error.message}`)
}

export const envVars: EnvVars = value
