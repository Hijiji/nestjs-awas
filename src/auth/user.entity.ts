//import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Member } from "./member.entity";

@Entity()
@Unique(['name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    pw: string;

    @Column()
    admissionDate: string;
    @OneToMany(type => Member, member=> member.id, {eager:true})
    members:Member[]

    // @OneToMany(type => Board, board => board.user, { eager: true })
    // boards: Board[]
}