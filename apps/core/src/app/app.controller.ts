import { Controller, Get } from '@nestjs/common'
import { HealthCheck } from '@nestjs/terminus'
import { Throttle } from '@nestjs/throttler'
import { AppService } from './app.service'
import { Public } from './utils/decorators'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('health')
    @HealthCheck()
    @Public()
    @Throttle({ default: { limit: 100, ttl: 60000 } })
    getCheck() {
        return this.appService.getHealth()
    }

}
