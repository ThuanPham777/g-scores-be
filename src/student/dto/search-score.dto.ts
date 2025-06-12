import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchScoreDto {
    @ApiProperty()
    @IsString({ message: "registration number must be a string" })
    @IsNotEmpty()
    registrationNumber: string;
}