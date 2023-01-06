import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { truncateSync } from 'fs';
import { stringify } from 'querystring';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository : MemberRepository
    ){}

    //회원가입
    async createMember(authCredentialsDto:AuthCredentialsDto):Promise<Member>{
        return this.memberRepository.createMember(authCredentialsDto);
        //return null;
    }

    //로그인
    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<string>{
        const { name, pw } = authCredentialsDto;
        const user = await this.memberRepository.findOneBy({name});
        if(authCredentialsDto.pw===user.pw){
            return "로그인성공";
        }
        throw new UnauthorizedException('login failed');

    }

    //회원조회
    // async getMember():Promise<Member>{
        
    //     //return this.memberRepository.getMember(member);
    //     return this.memberRepository.findOneBy({id:'1'});
    // }
    async getMembers():Promise<Member[]>{
        //return this.memberRepository.getMember(member);
        return this.memberRepository.find({
            select:{
                id:true
                ,pw:true
                ,name:true
                ,admissionDate:true
            }
        });
    }
}