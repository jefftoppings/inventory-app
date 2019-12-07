import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, Subscription} from 'rxjs';
import {AuthService, User} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  projects$: Observable<any[]>;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.user$ = this.auth.user$;
    // TODO user id to get projects here
    this.projects$ = this.db.list(`/inventory/users/user1`).valueChanges();
    // this.db.list('/projectName/firstProject/items').valueChanges()
    //   .subscribe();
  }

  get projects(): Observable<any[]> {
    return this.projects$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
