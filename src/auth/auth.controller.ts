import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentDto } from 'src/student/DTO/student-dto';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() studentDto: StudentDto) {
        return this.authService.register(studentDto)
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Get('profile')
    @UseGuards(JwtAuthService)
    @Roles(Role.User)
    getProfile(@Request() req:any) {
        // Return the profile and success message
        return {
            message: 'Profile record fetched successfully',
            user: req.user,
        };
    }
}
