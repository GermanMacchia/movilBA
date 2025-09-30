import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const handleException = (
    logger: Logger,
    log: string,
    exception: HttpStatus,
    exceptionMsg: { name: string; message: string }
) => {
    const msj = `[${exceptionMsg.name}] ${exceptionMsg.message}`
    logger.error(log)
    throw new HttpException(msj, exception)
}
