import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

@Controller('/api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  getProfile(@Req() req): string {
    return JSON.stringify(req.user, null, 4);
  }

}
