import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UserService } from './database/entities/user/user.service';

@Controller('/api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  getProfile(@Req() req): string {
    return JSON.stringify(req.user, null, 4);
  }

  @Get('users')
  async getUsers(): Promise<string> {

    const users = await this.userService.findAll();

    const userList = users.map(user => {
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        appAmount: 0,
        isAdmin: user.isAdmin,
      };
    });

    return JSON.stringify(userList, null, 4);
  }
}
