import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 클라이언트의 HTTP 요청을 처리함.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
