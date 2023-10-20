import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/database/entities/user/user.module";
import { SessionSerializer } from "./session.serializer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/user/user.entity";
import { UserService } from "src/database/entities/user/user.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.SESSION_SECRET,
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],
    providers: [
        AuthService,
        SessionSerializer,
    ],
    controllers: [
        AuthController,
    ],
    exports: [
        AuthService,
        SessionSerializer,
    ]
})
export class AuthModule {}