import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({example: "My first post"})
    @IsString()
    post_title: string;

    @ApiProperty({example: "This is post text. It can be empty"})
    @IsString()
    post_text: string;

    @ApiProperty({example: "This is post image. You have to upload image file"})
    @IsString()
    post_image: string; 
}