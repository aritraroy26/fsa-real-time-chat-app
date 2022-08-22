import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationsService } from '../conversations.service';
import { UsersService } from '../users.service';
import firebase from 'firebase';
import { User } from '../types';

@Component({
  selector: 'app-new-conversation-page',
  templateUrl: './new-conversation-page.component.html',
  styleUrls: ['./new-conversation-page.component.css'],
})
export class NewConversationPageComponent implements OnInit {
  nameValue: string = '';
  currentUser: firebase.User | null = null;
  users: User[] = [];
  memberIds: string[] = [];

  constructor(
    private router: Router,
    private conversationsService: ConversationsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));

    this.usersService.getAllUsers().subscribe((users) => (this.users = users));
  }

  addMember(userId: string): void {
    this.memberIds.push(userId);
  }

  createConversation(): void {
    this.conversationsService
      .createConversation(this.nameValue, this.memberIds)
      .subscribe((newConversationId) =>
        this.router.navigateByUrl(`/conversations/${newConversationId}`)
      );
  }
}
