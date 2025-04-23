import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health checks')
@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping(): { [key: string]: string } {
    return this.appService.ping();
  }

  @Get('health/check')
  healthCheck(): { [key: string]: string } {
    return this.appService.healthCheck();
  }
}
