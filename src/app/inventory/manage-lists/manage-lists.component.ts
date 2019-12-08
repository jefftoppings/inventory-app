import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, InventoryProject} from '../../general-services/data/data.service';
import {Observable, Subscription} from 'rxjs';
import {AuthService, User} from '../../general-services/auth/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.scss']
})
export class ManageListsComponent implements OnInit, OnDestroy {
  projects$: Observable<InventoryProject[]>;
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private data: DataService, private auth: AuthService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.projects$ = this.data.projects;
    this.user$ = this.auth.user$;
    this.subscriptions.push(
      this.projects$.subscribe(),
    );
  }

  deleteProject(project: InventoryProject) {
    this.subscriptions.push(this.data.deleteProject(project).subscribe(
      () => this.snackbar.open(`Successfully deleted ${project.title}`, 'Dismiss', {duration: 3000}),
      () => this.snackbar.open(`There was an error deleting ${project.title}`, 'Dismiss', {duration: 3000}),
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
