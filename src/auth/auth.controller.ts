import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMember } from './get-member.decorator';
import { Member } from './member.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post()
    createMember(@Body() createMemberDto:CreateMemberDto):Promise<void>{
        console.log(createMemberDto.name);
        console.log(createMemberDto.id);
        console.log(createMemberDto.pw);
        return this.authService.createMember(createMemberDto);
    }

    @Get()
    getMember(@GetMember() member:Member):Promise<Member>{
        return this.authService.getMember(member);
    }
}




