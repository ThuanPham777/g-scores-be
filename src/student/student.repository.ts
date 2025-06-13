import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Đảm bảo bạn đã có PrismaService
import { TopStudent } from 'src/type/topAStudents';


@Injectable()
export class StudentRepository {
    constructor(private prisma: PrismaService) { }

    async getScoreOfStudent(registrationNumber: string) {
        return this.prisma.student.findUnique({ where: { id: registrationNumber } });
    }


    // List top 10 students of group A including (math, physics, chemistry)
    async getTop10GroupAStudents() {
        const topAStudents = await this.prisma.$queryRawUnsafe(`
        SELECT
            "id",
            "math",
            "physics",
            "chemistry",
            ("math" + "physics" + "chemistry") AS total
        FROM "student"
        WHERE "math" IS NOT NULL AND "physics" IS NOT NULL AND "chemistry" IS NOT NULL
        ORDER BY total DESC
        LIMIT 10
        `)

        return topAStudents;
    }


    //Write a feature report. There will be 4 levels including: >= 8 points, 8 points > && >= 6 points, 6 points > && >= 4 points, <4 points
    //Statistics of the number of students with scores in the above 4 levels by subjects. (Chart)

    async getScoreLevelReportBySubject(subject: string) {
        const validSubjects = [
            'math',
            'literature',
            'foreignlanguage',
            'physics',
            'chemistry',
            'biology',
            'history',
            'geography',
            'civics'
        ];

        if (!validSubjects.includes(subject)) {
            throw new Error('Invalid subject name');
        }

        const query = `
        SELECT
            '${subject}' AS subject,
            COUNT(CASE WHEN "${subject}" >= 8 THEN 1 END) AS ">=8",
            COUNT(CASE WHEN "${subject}" >= 6 AND "${subject}" < 8 THEN 1 END) AS "6-7.99",
            COUNT(CASE WHEN "${subject}" >= 4 AND "${subject}" < 6 THEN 1 END) AS "4-5.99",
            COUNT(CASE WHEN "${subject}" < 4 THEN 1 END) AS "<4"
        FROM "student"
        WHERE "${subject}" IS NOT NULL
    `;

        const result = await this.prisma.$queryRawUnsafe(query);
        return this.convertBigInt(result);
    }


    convertBigInt(obj: any) {
        return JSON.parse(
            JSON.stringify(obj, (_, value) =>
                typeof value === 'bigint' ? Number(value) : value
            )
        );
    }
}
