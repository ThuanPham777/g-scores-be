import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetScoreLevelReportBySubjectDto {
    @ApiProperty()
    @IsString({ message: "subject" })
    @IsNotEmpty()
    subject: string;
}