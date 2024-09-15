import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './DTO/student-dto';

@Controller('student')
export class StudentController {
    constructor( private readonly studentService:StudentService){}


    @Post()
    createStudent(@Body() studentDto:StudentDto){
        return this.studentService.createStudent(studentDto);
    }

    @Get()
    getStudent(){
        return this.studentService.getAllStundent();
    }

    @Get(':id')
    findStudent(@Param(':id') id:number){
        return this.studentService.findOneStudent(id)
    }
}
