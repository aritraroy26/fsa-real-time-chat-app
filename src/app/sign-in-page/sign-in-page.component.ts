import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  errorMessage: string = '';
  emailValue: string = '';
  passwordValue: string = '';

  constructor(private router: Router, private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  onClickSignIn(): void {
    this.errorMessage = '';
    this.auth
      .signInWithEmailAndPassword(this.emailValue, this.passwordValue)
      .then(() => this.router.navigateByUrl('/'))
      .catch((err) => (this.errorMessage = err.message));
  }
}
