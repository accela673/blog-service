import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity]),
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './uploads',
    }),
  })],
  controllers: [PostsController],
  providers: [PostsService],
  exports: []
})
export class PostsModule {}
