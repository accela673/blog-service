import { BadRequestException, Controller, Delete, Get, Param, Post, Put, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UpdatePostDto } from './dto/update.post.dto';


@ApiTags('Posts endpoints for autorized users')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}
    

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({description: "This endpoint for creating post"})
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          post_title: { type: 'string' },
          post_text: { type: 'string' },
          post_image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('post_image'))

    @Post('/new')
    async newPost(@Request() req, @UploadedFile() image ){
        const post = new CreatePostDto()
        post.post_image = image.filename;
        post.post_title = req.body.post_title;
        post.post_text = req.body.post_text;
        post.userId = req.user.userId
        return await this.postsService.createPost(post)
    }




    @ApiOperation({description: "This endpoint for getting logined user's all posts"})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)

    @Get('/your_posts')
    async getAllYourPosts(@Request() req){
        return await this.postsService.findAllPosts(req.user.userId)
    }




    @ApiOperation({description: "This endpoint for getting someone's all posts"})
    @Get('/user/:id')
    async getSomeonesPosts(@Param('id') id: string){
        return await this.postsService.findSomeonesPosts(+id)
    }




    @ApiOperation({description: "This endpoint for getting one post by id"})
    @Get('/:post_id')
    async getPostById(@Param('post_id') id: string){
        return await this.postsService.findPost(+id)
    }




    @ApiOperation({description: "This endpoint for liking someone's post "})
    @Post('/like/:post_id')
    async likePostById(@Param('post_id') id: string){
        return await this.postsService.likePost(+id)
    }




    @ApiOperation({description: "This endpoint for disliking someone's post "})
    @Post('/dislike/:post_id')
    async disLikePostById(@Param('post_id') id: string){
        return await this.postsService.dislikePost(+id)
    }




    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint for deleting your post "})
    @Delete('/:post_id')
    async deletePost(@Param('post_id') id: string, @Request() req){
      return await this.postsService.deletePost(+id, req.user.userId)
    }




    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          post_title: { type: 'string' },
          post_text: { type: 'string' },
          post_image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('post_image'))
    @ApiOperation({description: "This endpoint for updating your post "})
    @Put('/:post_id')
    async updatePost(@Param('post_id') id: string, @Request() req, @UploadedFile() image ){
      const post = new UpdatePostDto()
      post.post_image = image.filename;
      post.post_title = req.body.post_title;
      post.post_text = req.body.post_text;
      return await this.postsService.updatePost(+id, post)

    }
}
