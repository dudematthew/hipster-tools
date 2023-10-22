import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('/api/auth/')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Request() req) {
        console.log(`Logging in user: ${JSON.stringify(req.user)}`);

        await req.logIn(req.user, (err) => {
          if (err) {
            throw err;
          }
        });

        return req.user;
    }
    
    // Get user info
    @UseGuards(LocalAuthGuard)
    @Get('profile')
    getProfile(@Request() req): string {
        console.log(`Getting profile for user: ${JSON.stringify(req.user)}`);

        return JSON.stringify(req.user, null, 4);
    }

}
