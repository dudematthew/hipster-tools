import { Injectable } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";
import { PassportSerializer } from "@nestjs/passport";
import { UserEntity } from "src/database/entities/user/user.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor (
        private userService: UserService,
    ) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: UserEntity) => void) {
        console.log(`Serializing user`, user);
        done(null, user);
    }

    async deserializeUser(user: any, done: (err: Error, user: UserEntity) => void) {
        console.log(`Deserializing user`, user);
        done(null, user);
    }

}