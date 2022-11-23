import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class UpdateUserDto {
    @IsString()
    new_pfp: string

    @ApiProperty({example: "UpdatedPassword"})
    @IsString()
    username: string;

    @ApiProperty({example: "UpdatedUsername"})
    @IsString()
    password: string;     
}