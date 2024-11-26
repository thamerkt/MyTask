import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-messaging',
  template: `
  <div>
    <h1>WebSocket Chat</h1>
    <input [(ngModel)]="message" placeholder="Enter your message" />
    <button (click)="sendMessage()">Send</button>
  </div>
  <div>
    <h2>Messages:</h2>
    <ul>
      <li *ngFor="let msg of messages">{{ msg }}</li>
    </ul>
  </div>
  `,
  styles: [
    `
      div {
        margin: 20px;
      }
      input {
        margin-right: 10px;
      }
    `,
  ],
})
export class MessagingComponent implements OnInit, OnDestroy {
  message: string = '';
  messages: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    // Connect WebSocket service
    this.webSocketService.connect();

    // Subscribe to incoming messages
    const sub = this.webSocketService.receiveStatus().subscribe((msg: string) => {
      this.messages.push(msg);
    });

    this.subscription.add(sub);
  }

  sendMessage() {
    if (this.message.trim()) {
      this.webSocketService.sendMessage({ content: this.message });
      this.message = ''; // Clear input
    }
  }

  ngOnDestroy(): void {
    // Clean up resources
    this.subscription.unsubscribe();
    this.webSocketService.disconnect();
  }
}
