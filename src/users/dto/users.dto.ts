import { IsNotEmpty, IsString } from "class-validator";



export class CreateUserDto {
    @IsString()
    user_pfp: string
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
     
}
