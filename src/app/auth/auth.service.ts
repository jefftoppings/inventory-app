import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$: Observable<firebase.User>;
  private userDetails: firebase.User;
  private subscriptions: Subscription[] = [];

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = firebaseAuth.authState;
    this.subscriptions.push(this.user$.subscribe(user => this.userDetails = user));
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn(): boolean {
    return !!this.userDetails;
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
