import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
    constructor(configService:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT is extracted from the Authorization header
            ignoreExpiration: false, // Ignore expired tokens
            secretOrKey: configService.get<string>('JWT_SECRET'), 
          });
    }

    async validate(payload:any){
        // Return User data
        return {
            userId:payload.sub, email:payload.email
        };
    }
}
