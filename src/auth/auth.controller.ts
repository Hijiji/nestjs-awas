import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetMember } from './get-member.decorator';
import { Member } from './member.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //회원가입
    @Post("/createMember")
    createMember(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<Member>{
        console.log("CONTROLLER");
        console.log(authCredentialsDto);        
        return this.authService.createMember(authCredentialsDto);
    }

    //로그인
    @Post()
    signIn(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<string>{
        return this.authService.signIn(authCredentialsDto);
    }

    //회원조회
    @Get("/getMembers")
    getMember():Promise<Member[]>{
        return this.authService.getMembers();
    }
}




