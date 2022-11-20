import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;
}