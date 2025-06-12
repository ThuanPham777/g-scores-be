import { ApiProperty } from "@nestjs/swagger";

export class ApiRes<T = any> {
    constructor(data: T, message?: string) {
        this.data = data;
        this.message = message;
    }

    data: T;

    @ApiProperty({ type: String, nullable: true })
    message?: string;
}