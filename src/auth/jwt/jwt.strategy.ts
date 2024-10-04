import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
  constructor(private readonly configService: ConfigService) {

    const jwtSecret = configService.get<string>('JWT_SECRET');
    console.log("jwtSecret", jwtSecret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT is extracted from the Authorization header
      ignoreExpiration: false, // Ignore expired tokens
      secretOrKey:jwtSecret // Make sure JWT_SECRET is fetched from env
    });


  }

  async validate(payload: any) {
    // Return User data
    return { userId: payload.sub, email: payload.email };
  }
}
