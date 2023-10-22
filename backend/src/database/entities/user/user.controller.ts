import { Controller, Get, UseGuards, Req, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('/api/')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

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
