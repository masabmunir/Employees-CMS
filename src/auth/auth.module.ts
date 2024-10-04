import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, 
      }),
    }),
    StudentModule, // Import student module to access the service
  ],
  providers: [AuthService, JwtStrategy, JwtAuthService], // Include JwtStrategy and JwtAuthService as providers
  controllers: [AuthController],
})

export class AuthModule {}
