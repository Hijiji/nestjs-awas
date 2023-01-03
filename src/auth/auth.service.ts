import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository : MemberRepository
    ){}

    async createMember(createMemberDto:CreateMemberDto):Promise<void>{
        return this.memberRepository.createMember(createMemberDto);
    }

    async getMember(member:Member):Promise<Member>{
        
        return this.memberRepository.findOne(member);
    }
}