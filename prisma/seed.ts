import { PrismaClient, student } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, '..', 'dataset', 'diem_thi_thpt_2024.csv');
    const students: student[] = [];

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Debug log for first row
                if (students.length === 0) {
                    //console.log('First row from CSV:', row);
                }
                students.push({
                    id: row.sbd,
                    math: parseFloatOrNull(row.toan),
                    literature: parseFloatOrNull(row.ngu_van),
                    foreignlanguage: parseFloatOrNull(row.ngoai_ngu),
                    physics: parseFloatOrNull(row.vat_li),
                    chemistry: parseFloatOrNull(row.hoa_hoc),
                    biology: parseFloatOrNull(row.sinh_hoc),
                    history: parseFloatOrNull(row.lich_su),
                    geography: parseFloatOrNull(row.dia_li),
                    civics: parseFloatOrNull(row.gdcd),
                    foreignlangcode: row.ma_ngoai_ngu || null,
                });
            })
            .on('end', () => {
                // Debug log for first processed student
                if (students.length > 0) {
                    //console.log('First processed student:', students[0]);
                }
                resolve();
            })
            .on('error', reject);
    });

    //await prisma.$executeRawUnsafe(`DELETE FROM "student"`);

    //console.log(`Importing ${students.length} students...`);

    //Chia nhỏ theo batch 1000 record/lần
    const batchSize = 1000;
    for (let i = 0; i < students.length; i += batchSize) {
        const batch = students.slice(i, i + batchSize);

        const values = batch.map((s) =>
            `('${s.id}', ${nullable(s.math)}, ${nullable(s.literature)}, ${nullable(s.foreignlanguage)}, ${nullable(s.physics)}, ${nullable(s.chemistry)}, ${nullable(s.biology)}, ${nullable(s.history)}, ${nullable(s.geography)}, ${nullable(s.civics)}, ${s.foreignlangcode ? `'${s.foreignlangcode}'` : 'NULL'})`
        ).join(',');

        await prisma.$executeRawUnsafe(`
        INSERT INTO "student" (
            "id", "math", "literature", "foreignlanguage", "physics",
            "chemistry", "biology", "history", "geography", "civics", "foreignlangcode"
        ) VALUES
        ${values}
        `);
    }

    //console.log('Seeding complete.');
}

function parseFloatOrNull(value: string): number | null {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
}

function nullable(value: number | null): string {
    return value === null ? 'NULL' : value.toString();
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
