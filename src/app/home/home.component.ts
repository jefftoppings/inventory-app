import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.loggedIn$;
  }

  signIn() {
    this.auth.signInWithGoogle();
  }
}
