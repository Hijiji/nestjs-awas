import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway,   WsResponse } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { channel } from 'diagnostics_channel';
import { Server, Socket, Namespace} from 'socket.io';//'http';
import { onlineMap } from './onlineMap';
//import { Socket } from 'dgram';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(8080,{
                        namespace:['websocket']
                        ,cors:{origin:'http://localhost:3000'}
                      })
                      //웹소켓은 실시간으로 방을 만들고 접속하는것임 namespace가 호텔이라면 room은 객실
                      //,({namespace:/\/ws-.+/}) //,{transports:['websocket']} 
                      //front는 3000번 포트에서 실행 중이고 nest는 8080번 포트에서 실행 중이므로, 포트가 달라서 CORS에러가 발생한다. 따라서 cors 설정을 해줌
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  //@WebSocketServer() public server:Server; //미들웨어에서 IO가져오는 것과 같다. 다른 곳에서 얘를 통해서 의존성주입을 해서 얘를 통해서 emit을 한다.
  @WebSocketServer() nsp:Namespace;// namespace가 설정되었기 때문에 데코레이터가 반환하는 값은 서버인스턴스가 아닌 namespace가 된다. 

  //초기화 이후 실행
  afterInit(server:Server):any{
    console.log('웹소켓 서버 init');
    console.log('serverInit');
  }

  //소켓이 연결되면 실행
  handleConnection(@ConnectedSocket() socket:Socket):any{ //소켓을 가져올 수 있다. Socket emit
    console.log('connection success');
    console.log('connected1', socket.nsp.name);
    console.log('connected2', socket.handshake.address);
    console.log('connected3', socket.id);
    //console.log('connected4', socket);

    if(!onlineMap[socket.nsp.name]){ //online map은 참가자 목록을 실시간으로 담고있는 객체다.
      onlineMap[socket.nsp.name]={};
    }
    //broadcast to all clients in the given sub-namespace
    socket.emit('hello',socket.nsp.name); //개별소멧. // socket.nsp.name : 소켓안에 있는 namespce 이름은 socket io 프로퍼티를 그대로 따른다.
  }

  //소켓 연결 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket:Socket):any{
    console.log('connection exit');
    console.log('disconnected', socket.nsp.name);
    console.log('disconnected', socket.handshake.address);
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit('onlineList',Object.values(onlineMap[socket.nsp.name]));
  }

  @SubscribeMessage('test')
  handleTest(@MessageBody() data:string){
    console.log('test',data);
    console.log('test');
  }

  @SubscribeMessage('message')
  handleMessage(  //    client: any, payload: any
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string,
  ){//  :string

    console.log('message : '+message);
    //return 'Hello world!';
    socket.broadcast.emit('message', { username: socket.id, message });
    return { username: socket.id, message };

  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('접속됨');
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data:{id:number; channerls:number[]},
    @ConnectedSocket() socket:Socket,
  ){
    const newNamespace = socket.nsp;
    console.log('login',newNamespace);
    onlineMap[socket.nsp.name][socket.id]=data.id;
    newNamespace.emit('onlineList',Object.values(onlineMap[socket.nsp.name]));
    data.channerls.forEach((channel:number)=>{
      console.log('join',socket.nsp.name, channel);
      socket.join(`${socket.nsp.name}-${channel}`);
    });
  }
}
