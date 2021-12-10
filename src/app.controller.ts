import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    return req.csrfToken();
  }
  @Post()
  getHello2(): string {
    return this.appService.getHello();
  }
}
