import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Member } from './member.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //회원가입
    @Post("/createMember")
    createMember(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<Member>{
        console.log("CONTROLLER");
        authCredentialsDto.admissionDate="2023-01-03";
        console.log(authCredentialsDto);
        
        return this.authService.createMember(authCredentialsDto);
    }

    //로그인
    @Post("/signIn")
    signIn(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<{}>{
        return this.authService.signIn(authCredentialsDto);
    }

    //회원조회
    @Post("/getMember")
    getMember(@Body() authCredentialsDto:AuthCredentialsDto):Promise<Member>{
        console.log(authCredentialsDto);
        return this.authService.getMember(authCredentialsDto);
    }

    //모든회원 조회
    @Get("/getMembers")
    getMembers():Promise<Member[]>{
        return this.authService.getMembers();
    }
}




