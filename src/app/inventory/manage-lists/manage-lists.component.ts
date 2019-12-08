import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, InventoryProject} from '../../general-services/data/data.service';
import {Observable, Subscription} from 'rxjs';
import {AuthService, User} from '../../general-services/auth/auth.service';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.scss']
})
export class ManageListsComponent implements OnInit, OnDestroy {
  projects$: Observable<InventoryProject[]>;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private data: DataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.projects$ = this.data.projects;
    this.user$ = this.auth.user$;
    this.subscriptions.push(
      this.projects$.subscribe(console.log),
    );
  }

  deleteProject(project: InventoryProject) {
    this.data.deleteProject(project);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
