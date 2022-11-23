import { UsersEntity } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsEntity{
    @PrimaryGeneratedColumn()
    post_id: number
    
    @Column({length:50})
    post_title: string;
    
    @Column({nullable: true})
    post_image: string
    
    @Column({nullable: true, length: 2200})
    post_text: string
    
    @Column({default: 0})
    likes_dislikes: number
    
    @Column()
    userId: number; 
}