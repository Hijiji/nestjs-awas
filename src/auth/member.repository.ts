import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/typeorm.decorator";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { Member } from "./member.entity";

@CustomRepository(Member)
export class MemberRepository extends Repository<Member>{

    constructor(private dataSource: DataSource) {
        super(Member, dataSource.createEntityManager());
    }

    async createMember(authCredentialsDto: AuthCredentialsDto):Promise<Member>{
        const {name, id, pw, admissionDate} = authCredentialsDto;
        const member =this.create({
            name,
            id,
            pw,
            admissionDate
            
        });

        await this.save(member);
        return member;
    }
    async getMember(member:Member) :Promise<Member>{
        const result =await super.createQueryBuilder('member')
        .getOne();
        return result;
    }
}