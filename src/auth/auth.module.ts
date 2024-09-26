import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret:'',
      signOptions:{}
    }),
    StudentModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
