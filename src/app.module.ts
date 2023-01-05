import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ConnectionService } from './connection.service';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig)
    ,AuthModule
    ,ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../static'), //두번째 인자값으로 .. 경로 넣고 세번째 인자값으로 'static 넣어도 됨'
    })
  ]
  ,controllers: [
    //AppController
  ]
  ,providers: [
   //AppService
    //,ConnectionService
  ]

})
export class AppModule {}
