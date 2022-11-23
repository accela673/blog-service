import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    user_id: number
    
    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;

    @Column({nullable: true})
    user_pfp: string
    
    @Column({default: 0})
    posts: number;
    
    @Column({default: 0})
    followers: number
    
    @Column({default: 0})
    following: number
}