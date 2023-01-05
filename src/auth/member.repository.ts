import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/typeorm.decorator";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { Member } from "./member.entity";

@CustomRepository(Member)
export class MemberRepository extends Repository<Member>{
    async createMember(authCredentialsDto: AuthCredentialsDto):Promise<Member>{
        console.log("REPOSITORY 111111");
        console.log(authCredentialsDto.name);
        console.log(authCredentialsDto.id);
        console.log(authCredentialsDto.pw);
        const {name, id, pw} = authCredentialsDto;
        console.log("REPOSITORY 222222");
        console.log(name);
        console.log(id);
        console.log(pw);
        const member =this.create({
            name,
            id,
            pw
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