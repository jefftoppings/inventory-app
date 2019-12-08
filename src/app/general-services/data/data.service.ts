import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, of, Subscription} from 'rxjs';
import {AuthService, User} from '../auth/auth.service';
import {map, switchMap} from 'rxjs/operators';

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
          return this.db.list<InventoryProject>(`/inventory/users/${user.id}`).valueChanges().pipe(
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
      }),
      map(projects => {
        return projects.map(p => {
          return {
            ...p,
            creationDate: new Date(p.creationDate),
            lastModified: new Date(p.lastModified)
          };
        });
      })
    );
  }

  get projects(): Observable<any[]> {
    return this.projects$;
  }

  addNewProject(projectTitle: string): Observable<any> {
    return this.user$.pipe(
      map((user: User) => {
        return this.db.list(`/inventory/users/${user.id}/projects/`).set(projectTitle, {
          title: projectTitle,
          creationDate: new Date().toString(),
          lastModified: new Date().toString(),
        });
      })
    );
  }

  deleteProject(project: InventoryProject): Observable<any> {
    return this.user$.pipe(
      map((user: User) => {
        return this.db.list(`/inventory/users/${user.id}/projects/`).remove(project.title);
      })
    );
  }

  getProject(title: string): Observable<InventoryProject> {
    return this.projects$.pipe(
      map(projects => {
        const project: InventoryProject[] = projects.filter(p => p.title === title);
        return project[0];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
