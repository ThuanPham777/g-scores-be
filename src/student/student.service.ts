import { Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { SearchScoreDto } from './dto/search-score.dto';
import { GetScoreLevelReportBySubjectDto } from './dto/get-score-level-report-by-subject';

@Injectable()
export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) { }

    async getScoreOfStudent(data: SearchScoreDto) {
        return this.studentRepository.getScoreOfStudent(data.registrationNumber);
    }

    async getTop10GroupAStudents() {
        return this.studentRepository.getTop10GroupAStudents();
    }

    async getScoreLevelReportBySubject(data: GetScoreLevelReportBySubjectDto) {
        return this.studentRepository.getScoreLevelReportBySubject(data.subject);
    }

}
