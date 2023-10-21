import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";
import { UserInterface } from "src/database/entities/user/user.interface";
import { UserEntity } from "src/database/entities/user/user.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(credentials: { id: number, password: string }): Promise<any> {
        console.info(`Validating user with credentials: ${JSON.stringify(credentials)}`);

        const user = await this.userService.findOneById(credentials.id);

        if (!user || user.password !== credentials.password) {
            throw new UnauthorizedException();
        }
        
        const { password, ...result } = user;

        const payload = {
            sub: user.id,
            username: user.name,
        };

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: process.env.SESSION_SECRET,
            }),
        };
    }
}