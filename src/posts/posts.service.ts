import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.post.dto';
import { PostsEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostsEntity)
    private readonly postRepo: Repository<PostsEntity>){}

    async createPost(post: CreatePostDto){
        return await this.postRepo.save(post)
    }


    async findPost(){}


    async findAllPosts(){}


    async updatePost(){}


    async likePost(){}


    async dislikePost(){}


    async deletePost(){}

}
