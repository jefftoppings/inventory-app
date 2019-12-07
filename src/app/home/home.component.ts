import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, User} from '../general-services/auth/auth.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.loggedIn$;
    this.user$ = this.auth.user$;
    this.subscriptions.push(
      this.user$.subscribe(),
      this.isLoggedIn$.subscribe()
    );
  }

  signIn() {
    this.auth.signInWithGoogle();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
