import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationsService } from '../conversations.service';
import { Message } from '../types';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.css'],
})
export class ConversationPageComponent implements OnInit, OnDestroy {
  messageInputValue: string = '';
  messages: Message[] = [];
  socketConnection!: Socket;
  conversationId: string = '';

  constructor(
    private route: ActivatedRoute,
    private conversationsService: ConversationsService
  ) {}

  ngOnInit(): void {
    this.conversationId = this.route.snapshot.params.conversationId;
    this.conversationsService
      .getConversationSocketConnection(this.conversationId)
      .subscribe((socket) => {
        this.socketConnection = socket;

        this.socketConnection.on('initialMessages', (messages) => {
          this.messages = messages;
        });

        this.socketConnection.on('updatedMessages', (messages) => {
          this.messages = messages;
        });
      });
  }

  ngOnDestroy(): void {
    this.socketConnection.disconnect();
  }

  postMessage(): void {
    this.socketConnection.emit('postMessage', {
      text: this.messageInputValue,
      conversationId: this.conversationId,
    });
    this.messageInputValue = '';
  }
}
