import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Delete, Patch, Put, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';


@ApiTags("Users(Profiles) endpoints")
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @UsePipes(new ValidationPipe())
    @Post('/registration')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            user_pfp: {
              type: 'string',
              format: 'binary'
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('user_pfp'))
    async createUser(@Request() req, @UploadedFile() image) {
        const user = new CreateUserDto()
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        user.user_pfp = image.filename
        user.username = req.body.username
        user.password = hashedPassword
        return await this.usersService.createUser(user)
    }

    @Get('/users')
    async getUsers(){
        return await this.usersService.findUsers()
    }

    @Get('/users/:id')
    async getUserByID(@Param('id') id: string){
        return await this.usersService.findOne(+id)
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deleteUserByID(@Request() req){
        return await this.usersService.delete(req.user.userId, req.user.username)
    }


    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            new_pfp: {
              type: 'string',
              format: 'binary'
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('user_pfp'))
    async patchUserByID(@Request() req){
        const newUser = new UpdateUserDto()
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        newUser.new_pfp = req.body.new_pfp;
        newUser.username = req.body.username;
        newUser.password = hashedPassword
        return await this.usersService.editOne(req.user.userId, newUser)
    }
}