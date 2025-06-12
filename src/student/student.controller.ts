import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiRes } from 'src/type/custom-respone';
import { SUCCESS } from 'src/constants/response.constant';
import { SearchScoreDto } from './dto/search-score.dto';
import { query } from 'express';
import { GetScoreLevelReportBySubjectDto } from './dto/get-score-level-report-by-subject';

@ApiTags("Students")
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    // check score from registration number input
    @Get('search-score')
    @ApiOperation({ summary: "check score from registration number input" })
    async getScoreOfStudent(@Query() query: SearchScoreDto) {
        const result = await this.studentService.getScoreOfStudent(query);
        return new ApiRes(result, SUCCESS);
    }

    // List top 10 students of group A including (math, physics, chemistry)
    @Get("top-10-students")
    @ApiOperation({ summary: "List top 10 students of group A including (math, physics, chemistry)" })
    async getTop10GroupAStudents() {
        const results = await this.studentService.getTop10GroupAStudents();
        return new ApiRes(results, SUCCESS);
    }

    @Get("reports/grade-distribution")
    @ApiOperation({ summary: "Statistics of the number of students with scores in the above 4 levels by subjects. (Chart)" })
    async getScoreLevelReportBySubject(@Query() query: GetScoreLevelReportBySubjectDto) {
        const results = await this.studentService.getScoreLevelReportBySubject(query);
        return new ApiRes(results, SUCCESS);
    }
}
