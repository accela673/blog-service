import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepo: Repository<UsersEntity>
    ){}


    async createUser(user: CreateUserDto): Promise<CreateUserDto>{
        const newUser = await this.userRepo.findOne({where:{username: user.username}})
        if(newUser) throw new BadRequestException(`User ${user.username} is already exists`)
        return await this.userRepo.save(user);
      }

    async findUsers(){
        return await this.userRepo.find()
    } 

    async findOne(id: number): Promise<CreateUserDto>{
        return await this.userRepo.findOne({where: {id: id}})
    }

    async deleteOne(id: number){
        const user = await this.userRepo.findOne({where:{id: id}})
        if(!user) throw new BadRequestException(`User does not exists`)
        return await this.userRepo.remove(user)
    }

    async editOne(id: number , newUser: CreateUserDto){
        const user = await this.userRepo.findOne({where:{id: id}})
        if(!user) throw new BadRequestException(`User does not exists`)
        Object.assign(user, newUser)
        return await this.userRepo.save(user)
    }
}


