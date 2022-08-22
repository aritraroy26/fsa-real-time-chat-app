import { Component, OnInit } from '@angular/core';
import { ConversationsService } from '../conversations.service';
import { Conversation } from '../types';

@Component({
  selector: 'app-conversations-list-page',
  templateUrl: './conversations-list-page.component.html',
  styleUrls: ['./conversations-list-page.component.css'],
})
export class ConversationsListPageComponent implements OnInit {
  isLoading: boolean = true;
  conversations: Conversation[] = [];

  constructor(private conversationsService: ConversationsService) {}

  ngOnInit(): void {
    this.conversationsService.loadUserConversation().subscribe((data) => {
      this.conversations = data;
      this.isLoading = false;
    });
  }
}
