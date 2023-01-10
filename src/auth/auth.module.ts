import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { Member } from './member.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Member])
  ]
  ,controllers: [AuthController]
  ,providers: [
    AuthService
    ,MemberRepository
  ]
})
export class AuthModule {}