import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserModule } from "src/database/entities/user/user.module";
import { SessionSerializer } from "./session.serializer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/user/user.entity";
import { UserService } from "src/database/entities/user/user.service";
import { AuthController } from "./auth.controller";


@Module({
    imports: [
        PassportModule.register({ 
            defaultStrategy: 'discord',
            session: true,
        }),
        UserModule,
        TypeOrmModule.forFeature([UserEntity]),
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
        PassportModule,
        SessionSerializer,
    ]
})
export class AuthModule {}