import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { JwtService } from '@nestjs/jwt';
import { StudentDto } from 'src/student/DTO/student-dto';
import * as bcrypt from 'bcrypt';
import { Role } from './role/role.enum';

@Injectable()
export class AuthService {
    constructor(private studentService: StudentService,
        private jwtService: JwtService) { }


    async register(studentDto: StudentDto) {
        const hashPassword = await this.hashPassword(studentDto.password);
        const newStudent = await this.studentService.createStudent({
            ...studentDto,
            password: hashPassword
        });
        return newStudent;
    }

    async login(email: string, password: string) {
        const student = await this.studentService.findByEmail(email);

        if(!student){
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password,student.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
          }

          const payload = {email:student.email, sub:student.id, roles:[Role.User]};
          return{
            access_token:this.jwtService.sign(payload)
          }
    }

    private async hashPassword(password: string): Promise<string> {
        const roundSalt = 8;
        return bcrypt.hash(password, roundSalt)
    }
}
