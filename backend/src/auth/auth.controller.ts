import { Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";
import { LoginUserDto } from "./dtos/login.dto";

@Controller('/api/auth/')
export class AuthController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() body: LoginUserDto): Promise<string> {

        console.log(body);

        const user = await this.userService.findOneById(body.id);

        if (!user) {
            // return 401
            throw new UnauthorizedException();
        }

        if (user.password !== body.password) {
            // return 401
            throw new UnauthorizedException();
        }

        return 'success';
    }

    @Get('test')
    async test(): Promise<string> {
        return 'test';
    }

}
