import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket} from 'socket.io';//'http';
import { onlineMap } from './onlineMap';
//import { Socket } from 'dgram';

@WebSocketGateway({namespace:/\/ws-.+/}) //웹소켓은 실시간으로 방을 만들고 접속하는것임 namespace가 호텔이라면 room은 객실
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  @WebSocketServer() public server:Server; //미들웨어에서 IO가져오는 것과 같다. 다른 곳에서 얘를 통해서 의존성주입을 해서 얘를 통해서 인입(init?)을 한다.
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  afterInit(server:Server):any{
    console.log('웹소켓 서버 init');
  }

  handleConnection(@ConnectedSocket() socket:Socket):any{ //소켓을 가져올 수 있다. Socket emit
    console.log('connected', socket.nsp.name);
    if(!onlineMap[socket.nsp.name]){
      onlineMap[socket.nsp.name]={};
    }
    //broadcast to all clients in the given sub-namespace
    socket.emit('hello',socket.nsp.name); //개별소멧. // socket.nsp.name : 소켓안에 있는 namespce 이름은 socket io 프로퍼티를 그대로 따른다.
  }

  handleDisconnect(client:any):any{

  }
}
