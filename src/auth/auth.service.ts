import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        const {name, id, pw, admissionDate} = authCredentialsDto;
        const member =this.memberRepository.create({
            name,
            id,
            pw,
            admissionDate
        });

        await this.memberRepository.save(member);
        return this.getMember(id);
    }

    //로그인
    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{}>{
        const { id, pw } = authCredentialsDto;
        const user = await this.memberRepository.findOneBy({id});
        if(pw===user.pw){
            return {"result":"로그인성공"};
        }
        throw new UnauthorizedException('login failed');

    }

    //회원조회
    async getMember(id:string):Promise<Member>{
        console.log("getMember실행됨");
        return this.memberRepository.findOneBy({id});
    }

    //모든회원조회
    async getMembers():Promise<Member[]>{
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