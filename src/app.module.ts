import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module'; 
import { RentModule } from './rent/rent.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  
  imports: [
  ConfigModule.forRoot({envFilePath: ".env"}),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), PostsModule, RentModule, AuthModule, UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
