import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member extends BaseEntity {
    
    @Column({name:"user_name"})
    name: string;

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    pw: string;

    @Column({name:"admission_date"})
    admissionDate: string;
}