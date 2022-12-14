import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from './types';
import { httpOptionsWithAuthToken } from './http-options-with-auth-token';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  getAllUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<User[]>(`/api/users`, httpOptionsWithAuthToken(token))
                .subscribe((users) => observer.next(users));
            }
          });
      });
    });
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.auth.user;
  }
}
