import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        // Call the super constructor passing in the options 
        // object containing the usernameField and passwordField
        super({
            usernameField: 'id',
        });
    }

    /**
     * Validate a user's credentials against the database
     * This method is called by Passport when attempting to authenticate a user
     * @param id user's id
     * @param password user's password
     * @returns the user if the credentials are valid
     */
    async validate(id: string, password: string): Promise<any> {
        console.log(`Validating user with id: ${id} and password: ${password}`);
        const user = await this.authService.validateUser(parseInt(id), password);

        if (!user)
            throw new UnauthorizedException();
    
        console.log(`User validated: ${JSON.stringify(user)}`);

        return user;
    }
}