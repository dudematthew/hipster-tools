import { Injectable } from "@nestjs/common";
import { UserService } from "src/database/entities/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async validateUser(id: number, password: string): Promise<{}> {
        console.info(`Validating user with credentials: ${JSON.stringify({ id, password })}`);

        const user = await this.userService.findOneById(id);

        if (!user || user.password !== password)
            return null;
        
        const { password: _, ...result } = user;

        console.log(result);

        return result;
    }
}