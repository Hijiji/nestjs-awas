import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway,   WsResponse } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { channel } from 'diagnostics_channel';
import { Server, Socket} from 'socket.io';//'http';
import { onlineMap } from './onlineMap';
//import { Socket } from 'dgram';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(8080,{cors:{origin:'http://localhost:3000'}})//,({namespace:/\/ws-.+/}) //,{transports:['websocket']} //웹소켓은 실시간으로 방을 만들고 접속하는것임 namespace가 호텔이라면 room은 객실
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  @WebSocketServer() public server:Server; //미들웨어에서 IO가져오는 것과 같다. 다른 곳에서 얘를 통해서 의존성주입을 해서 얘를 통해서 emit을 한다.
  
  @SubscribeMessage('message')
  handleTest(@MessageBody() data:string){
    console.log('test',data);
    console.log('test');
  }

  @SubscribeMessage('message1')
  handleMessage(client: any, payload: any): string {
    console.log('message');
    return 'Hello world!';
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
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

  afterInit(server:Server):any{
    console.log('웹소켓 서버 init');
    console.log('serverInit');
  }

  handleConnection(@ConnectedSocket() socket:Socket):any{ //소켓을 가져올 수 있다. Socket emit
    console.log('connected1', socket.nsp.name);
    console.log('connected2', socket.handshake.address);
    console.log('connected3', socket.id);
    console.log('connection success');
    if(!onlineMap[socket.nsp.name]){ //online map은 참가자 목록을 실시간으로 담고있는 객체다.
      onlineMap[socket.nsp.name]={};
    }
    //broadcast to all clients in the given sub-namespace
    socket.emit('hello',socket.nsp.name); //개별소멧. // socket.nsp.name : 소켓안에 있는 namespce 이름은 socket io 프로퍼티를 그대로 따른다.
  }

  handleDisconnect(@ConnectedSocket() socket:Socket):any{
    console.log('connection exit');
    console.log('disconnected', socket.nsp.name);
    console.log('connected', socket.handshake.address);
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit('onlineList',Object.values(onlineMap[socket.nsp.name]));
  }
}
