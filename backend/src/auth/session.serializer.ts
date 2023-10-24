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
        const dbUser = await this.userService.findOneById(user.id);
        if (!dbUser) {
            return done(new Error(`Couldn't deserialize user: user with id ${user.id} could not be found`), null);
        }

        done(null, dbUser);
    }

}