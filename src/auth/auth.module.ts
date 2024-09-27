import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from './jwt/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync
    ({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async(configService:ConfigService)=>({
        secret: configService.get<string>('JWT_SECRET'), // Use env variable for secret
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // Use env variable for token expiration}
      })
    }),
    StudentModule  // Import student module to access the service
  ],
  providers: [AuthService, JwtService, JwtAuthService],
  controllers: [AuthController]
})
export class AuthModule {}
