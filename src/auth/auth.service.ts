import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository : MemberRepository
    ){}

    async createMember(createMemberDto:CreateMemberDto):Promise<Member>{
        console.log("SERViCE");
        console.log(createMemberDto.name);
        console.log(createMemberDto.id);
        console.log(createMemberDto.pw);
        return this.memberRepository.createMember(createMemberDto);
        //return null;
    }

    // async getMember():Promise<Member>{
        
    //     //return this.memberRepository.getMember(member);
    //     return this.memberRepository.findOneBy({id:'1'});
    // }
    async getMember():Promise<Member>{
        //return this.memberRepository.getMember(member);
        return this.memberRepository.findOneBy({id:'1'});
    }

}