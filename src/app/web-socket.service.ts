import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {io} from 'socket.io-client/build/index';
// import {io} from 'socket.io-client';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any; //SocketIOClient.Socket;
  userDetails: roomDetails;
  constructor() {
    this.socket = io(environment.server);
  }

  joinRoom(roomDetails: roomDetails): void {
    this.userDetails = roomDetails;
    this.emit('join', roomDetails);
  }

  disconnectExistingUser(): void {
    if (this.userDetails && this.userDetails.room && this.userDetails.username && this.socket) {
      this.userDetails = undefined;
      this.socket.disconnect();
    }
  }

  isConnection() {
    return !!this.socket;
  }

  listen(eventname:any) {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data:any) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventname:string, data:any = null) {
    this.socket.emit(eventname, data);
  }

  newUserJoined() {
    let observable = new Observable<roomDetails>(observer => {
      this.socket.on('user joined', data => {
        return observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  hasVotingStarted() {
    let observable = new Observable<boolean>(observer => {
      this.socket.on('voting started', (data) => {
        return observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  cardSelected() {
    let observable = new Observable<boolean>(observer => {
      this.socket.on('card selected', (data) => {
        return observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  votingCompleted() {
    let observable = new Observable<boolean>(observer => {
      this.socket.on('voting completed', (data) => {
        return observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  userDisconnected() {
    let observable = new Observable<boolean>(observer => {
      this.socket.on('user disconnected', (data) => {
        return observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
}
