import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StudentRepository } from './student.repository';

@Module({
    controllers: [StudentController],
    providers: [StudentService, StudentRepository, PrismaService],
})
export class StudentModule { }
