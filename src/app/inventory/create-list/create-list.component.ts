import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, User} from '../../general-services/auth/auth.service';
import {DataService} from '../../general-services/data/data.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private auth: AuthService, private data: DataService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  createList(title: string) {
    this.subscriptions.push(
      this.data.addNewProject(title).subscribe(
        () => this.router.navigateByUrl('/manage-list'),
        () => this.showErrorSnackbar()
      )
  );
  }

  showErrorSnackbar() {
    this.snackBar.open('There was an error creating your list', 'Dismiss', {duration: 5000});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
