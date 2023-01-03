import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/typeorm.decorator";
import { Repository } from "typeorm";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./member.entity";

@CustomRepository(Member)
export class MemberRepository extends Repository<Member>{
    async createMember(createMemberDto: CreateMemberDto):Promise<void>{
        const {name, id, pw} = createMemberDto;

        const member =this.create({
            name,
            id,
            pw
        });

        await this.save(member);
        //return member;
    }
    // async getMember(member:Member) :Promise<Member>{
    //     const result =await super.createQueryBuilder('member')
    //     .getOne();
    //     return result;
    // }
}