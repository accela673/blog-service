import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { PostsEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostsEntity)
    private readonly postRepo: Repository<PostsEntity>){}

    async createPost(post: CreatePostDto){
        return await this.postRepo.save(post)
    }


    async findPost(id: number){
        const post =  await this.postRepo.findOne({where:{post_id: id}})
        if (!post) return "This post doesn't exists"
        return post
    }


    async findAllPosts(id: number){
        const [post, postCount] = await this.postRepo.findAndCount({where: {userId: id}})
        if(!post.length) return 'You have no posts'
        return  post
    }

    async findSomeonesPosts(id: number){
        const [post, postCount] = await this.postRepo.findAndCount({where: {userId: id}})
        if(!post.length) return `This user has no posts`
        return  post
    }


    async updatePost(id: number, newPost: UpdatePostDto ){
        const oldPost = await this.postRepo.findOne({where:{post_id:id}})
        Object.assign(oldPost, newPost)
        return await this.postRepo.save(oldPost)
    }


    async likePost(id: number){
        const post = await this.postRepo.findOne({where:{post_id:id}})
        post.likes_dislikes++
        return this.postRepo.save(post)
    }


    async dislikePost(id: number){
        const post = await this.postRepo.findOne({where:{post_id:id}})
        post.likes_dislikes--
        return this.postRepo.save(post)
    }


    async deletePost(postId: number, userId: number){
        const post = await this.postRepo.findOne({where:{post_id: postId, userId: userId}})
        await this.postRepo.remove(post)
        return "Removed successully"
    }

}
