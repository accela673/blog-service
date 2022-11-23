import { BadRequestException, Controller, Get, Param, Post, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';


@ApiTags('Posts endpoints for autorized users')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}
    
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post('/new')
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
    async newPost(@Request() req, @UploadedFile() image ){
        const post = new CreatePostDto()
        post.post_image = image.filename;
        post.post_title = req.body.post_title;
        post.post_text = req.body.post_text;
        post.userId = req.user.userId
        return await this.postsService.createPost(post)
    }
}
