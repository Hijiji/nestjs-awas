//import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    // @OneToMany(type => Board, board => board.user, { eager: true })
    // boards: Board[]
}