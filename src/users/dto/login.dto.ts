import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class LoginDto {
    @ApiProperty({example: "Slardar673"})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: "MyPassword673"})
    @IsNotEmpty()
    @IsString()
    password: string;
     
}
