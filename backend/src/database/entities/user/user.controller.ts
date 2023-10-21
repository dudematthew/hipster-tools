import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    // Get user info
    @Get('profile')
    @UseGuards(AuthGuard)
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
