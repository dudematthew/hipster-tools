import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private jwtService: JwtService,
    ) {
        console.info(`AuthGuard Constructed Successfully. Session Secret: ${process.env.SESSION_SECRET}`);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log(`Checking if user is authenticated...`);

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromCookie(request);
        
        console.log(`Extracted token from cookie: ${token}`);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SESSION_SECRET,
            });

            // We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        console.log(`Extracting token from cookieS: ${JSON.stringify(request.cookies)}`)
        return request.cookies['token'];
    }
}