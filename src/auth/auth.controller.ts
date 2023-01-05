import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetMember } from './get-member.decorator';
import { Member } from './member.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("/createMember")
    createMember(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<Member>{
        console.log("CONTROLLER");
        console.log(authCredentialsDto.name);
        console.log(authCredentialsDto.id);
        console.log(authCredentialsDto.pw);
        
        return this.authService.createMember(authCredentialsDto);
    }

    @Post()
    signIn(@Body() authCredentialsDto:
    AuthCredentialsDto):Promise<string>{
        console.log(authCredentialsDto.id);
        console.log(authCredentialsDto.pw);
        
        return this.authService.signIn(authCredentialsDto);

    }

    @Get("/getMember")
    getMember():Promise<Member>{
        return this.authService.getMember();
    }
}




