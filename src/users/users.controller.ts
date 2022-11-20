import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Registration and login")
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @UsePipes(new ValidationPipe())
    @Post('/registration')
    async postUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        let {username, password} = user
        const hashedPassword = await bcrypt.hash(password, 8);
        user.password = hashedPassword
        return await this.usersService.createUser(user)
    }

    @Get()
    async getUsers(){
        return await this.usersService.findUsers()
    }

    @Get(':id')
    async getUserByID(@Param('id') id: string){
        return await this.usersService.findOne(+id)
    }

    @Delete(':id')
    async deleteUserByID(@Param('id') id: string){
        return await this.usersService.deleteOne(+id)
    }

    @Patch('id')
    async patchUserByID(@Param('id') id: string, @Body() updateUser: CreateUserDto){
        return await this.usersService.editOne(+id, updateUser)
    }
}