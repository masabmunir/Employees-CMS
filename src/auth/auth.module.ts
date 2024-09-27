import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
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
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
