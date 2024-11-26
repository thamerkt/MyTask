import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject: Subject<any> = new Subject<any>(); // Subject to emit messages

  constructor() {
    const socket = new SockJS('http://localhost:9090/ws');
    this.stompClient = new Client({ webSocketFactory: () => socket });

    // Set up client configuration
    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      // Subscribe to the /topic/public channel
      this.stompClient.subscribe('/topic/public', (message: Message) => {
        console.log('Received:', JSON.parse(message.body));
        // Emit the received message via the Subject
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  // Activate the connection
  connect() {
    this.stompClient.activate();
  }

  // Send messages
  sendMessage(message: any) {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(message),
      });
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // Disconnect the client
  disconnect() {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  // Method to expose the message subject as an observable
  receiveStatus() {
    return this.messageSubject.asObservable();
  }
}
