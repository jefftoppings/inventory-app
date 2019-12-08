import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, User} from '../../general-services/auth/auth.service';
import {DataService, InventoryProject} from '../../general-services/data/data.service';
import {MatSnackBar} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscriptions: Subscription[] = [];
  project$: Observable<InventoryProject>;

  constructor(private auth: AuthService, private data: DataService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.data.getProject(params.get('id'));
      })
    );
    this.subscriptions.push(
      this.project$.subscribe(console.log)
    );
  }

  deleteItem(item: string) {
    console.log(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
