import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import {
	ConnectionError,
	ConnectionRefusedError,
	ConnectionTimedOutError,
} from 'sequelize'

@Catch(ConnectionError, ConnectionRefusedError, ConnectionTimedOutError)
export class DatabaseExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
			statusCode: 503,
			message: 'Error de conexión a la base de datos',
		})
	}
}
