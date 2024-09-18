import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentDto } from './DTO/student-dto';

@Injectable()
export class StudentService {
    private students = [];

    // create student

   async createStudent(studentDTO:StudentDto){

        const hashPassword = await this.hashPassword(studentDTO.password);

        const newStudent = {
            id:Date.now(),
            ...studentDTO,
            password:hashPassword
        }

        this.students.push(newStudent);
        return newStudent;

    }

      // Helper function to hash the password
    private async hashPassword(password:string): Promise<string>{
        const saltRound = 7;
        return await bcrypt.hash(password,saltRound);
    }

    // find all student
    getAllStundent(){
        return this.students;
    }

    // Get a specific student by ID

    findOneStudent(id:number){
        const currentStudent = this.students.find(student=>student.id === id);
        if(!currentStudent){
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        return currentStudent;
    }


    // Update student

    updateStudent(id:number, updateStudentDTO: Partial<StudentDto>){
        const studentIndex = this.students.findIndex(student=>student.id === id);
        if(studentIndex === -1){

            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        this.students[studentIndex] = {...this.students[studentIndex], ...updateStudentDTO};
        return this.students[studentIndex];
    }

    // Delete student

    deleteStudent(id:number){
        const studentIndex = this.students.findIndex(student=>student.id === id);
        if(studentIndex === -1){
            throw new NotFoundException(`Student with ID ${id} not found`)
        }
        const removeStudent = this.students.splice(studentIndex,1);
        return removeStudent;
    }
}
