import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class CreatePostDto {
    @ApiProperty({example: "My first post"})
    @IsNotEmpty()
    @IsString()
    post_title: string;

    @ApiProperty({example: "This is post text. It can be empty"})
    @IsString()
    post_text: string;

    @ApiProperty({example: "This is post image. You have to upload image file"})
    @IsString()
    post_image: string;  

    userId: number;
}