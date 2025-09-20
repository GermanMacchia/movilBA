import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { HealthCheck } from '@nestjs/terminus'
import { Throttle } from '@nestjs/throttler'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

    @Get('health')
    @HealthCheck()
    @Throttle({ default: { limit: 100, ttl: 60000 } })
    getCheck() {
        return this.appService.getHealth()
    }

}
