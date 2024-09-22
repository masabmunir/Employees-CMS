import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentDto } from 'src/student/DTO/student-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
   async register(@Body() studentDto:StudentDto){
    return this.authService.register(studentDto)
    }

    @Post('login')
    async login(@Body() body:{email:string, password:string}){
        return this.authService.login(body.email, body.password);
    }
}
