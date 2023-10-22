import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/database/entities/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { SessionSerializer } from "./session.serializer";


@Module({
    imports: [
        UserModule,
        PassportModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule {}