import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {map, tap} from 'rxjs/operators';

export interface User {
  email: string;
  displayName: string;
  photoUrl: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userDetails$: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.userDetails$ = firebaseAuth.authState;
  }

  get user$(): Observable<User> {
    return this.userDetails$.pipe(
      map(userDetails => {
        if (userDetails) {
          return {
            email: userDetails.email,
            displayName: userDetails.displayName,
            photoUrl: userDetails.photoURL,
            id: userDetails.email.replace('.', ',')
          } as User;
        }
        return null;
      })
    );
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
