import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly user$: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = firebaseAuth.authState;
  }

  get user(): Observable<firebase.User> {
    return this.user$;
  }

  get loggedIn$(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(
      map(user => {
        return !!user;
      })
    );
  }

  signInWithGoogle(): Observable<any> {
    return from(this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ));
  }

  logout() {
    from(this.firebaseAuth.auth.signOut()).pipe(tap(() => this.router.navigate(['/'])));
  }
}
