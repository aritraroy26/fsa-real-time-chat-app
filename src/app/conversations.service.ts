import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { httpOptionsWithAuthToken } from './http-options-with-auth-token';
import { Conversation } from './types';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  loadUserConversation(): Observable<Conversation[]> {
    return new Observable<Conversation[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<Conversation[]>(
                  `/api/users/${user.uid}/conversations`,
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((data) => observer.next(data));
            }
          });
      });
    });
  }

  createConversation(name: string, memberIds: string[]): Observable<string> {
    return new Observable<string>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .post<string>(
                  `/api/conversation`,
                  { name, memberIds },
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((newConversationId) =>
                  observer.next(newConversationId)
                );
            }
          });
      });
    });
  }

  getConversationSocketConnection(conversationId: string): Observable<Socket> {
    return new Observable<Socket>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              const socket = io('http://127.0.0.1:8080', {
                query: {
                  conversationId,
                  token,
                },
              });
              observer.next(socket);
            }
          });
      });
    });
  }
}
