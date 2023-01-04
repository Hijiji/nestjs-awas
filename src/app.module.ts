import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ConnectionService } from './connection.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig)
    ,AuthModule
  ]
  ,controllers: [AppController]
  ,providers: [
    AppService
    //,ConnectionService
  ]
})
export class AppModule {}
