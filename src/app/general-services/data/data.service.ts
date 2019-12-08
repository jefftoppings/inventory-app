import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, of, Subscription} from 'rxjs';
import {AuthService, User} from '../auth/auth.service';
import {map, switchMap, tap} from 'rxjs/operators';

export interface InventoryProject {
  title: string;
  items: string[];
  creationDate: Date;
  lastModified: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  projects$: Observable<InventoryProject[]>;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.user$ = this.auth.user$;
    this.projects$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          // TODO user id to get projects here
          return this.db.list<InventoryProject>(`/inventory/users/user1`).valueChanges().pipe(
            map(data => {
              const inventoryProjects: InventoryProject[] = [];
              for (const key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                  inventoryProjects.push(data[0][key] as InventoryProject);
                }
              }
              return inventoryProjects;
            })
          );
        }
        return of([]);
      })
    );
  }

  get projects(): Observable<any[]> {
    return this.projects$;
  }

  addNewList(listTitle: string): Observable<any> {
    return this.user$.pipe(
      map((user: User) => {
        return this.db.list(`/inventory/users/${user.id}/projects/`).push({title: listTitle});
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
