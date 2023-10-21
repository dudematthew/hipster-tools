import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";
import { LoginUserDto } from "./dtos/login.dto";
import { Request, Response } from "express";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";

@Controller('/api/auth/')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: LoginUserDto, @Res() res: Response, @Req() req: Request) {

        console.info(`Logging in user with credentials: ${JSON.stringify(body)}`);

        const token = await this.authService.validateUser(body);

        console.info(`Adding token to cookie: ${JSON.stringify(token)}`);
        
        res.cookie('token', token.access_token, {
            httpOnly: true,
            sameSite: 'strict',
          });
        
          console.info(`Added token to cookie: ${res.get('Set-Cookie')}`)

        res.status(200).send('Login successful');
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Body() body: LoginUserDto, @Res() res: Response) {

    //     console.log(body);

    //     const user = await this.userService.findOneById(body.id);

    //     if (!user) {
    //         // return 401
    //         throw new UnauthorizedException();
    //     }

    //     if (user.password !== body.password) {
    //         const incorrectPasswordAttemptsKey = `incorrect-password-attempts:${body.id}`;

    //         const incorrectPasswordAttempts = await this.cacheManager.get<number>(incorrectPasswordAttemptsKey);

    //         if (incorrectPasswordAttempts && incorrectPasswordAttempts >= 3) {
    //             // return 429
    //             res.status(429).send('Too many incorrect password attempts');
    //             return;
    //         }

    //         // Increment incorrect password attempts and store it in cache for 1 minute
    //         await this.cacheManager.set(incorrectPasswordAttemptsKey, (incorrectPasswordAttempts || 0) + 1, 60 * 1000);

    //         // return 401
    //         throw new UnauthorizedException();
    //     }

    //     const loginAttemptsKey = `login-attempts:${body.id}`;

    //     const loginAttempts = await this.cacheManager.get<number>(loginAttemptsKey);

    //     if (loginAttempts && loginAttempts >= 7) {
    //         // return 429
    //         res.status(429).send('Too many login attempts');
    //         return;
    //     }

    //     // Increment login attempts and store it in cache for 1 minute
    //     await this.cacheManager.set(loginAttemptsKey, (loginAttempts || 0) + 1, 60 * 1000);

    //     res.status(200).send('Login successful');
    // }

}
