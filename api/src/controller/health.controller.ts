import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthController {
  @Get('/_health')
  getHello(): string {
    return 'ok';
  }
}
