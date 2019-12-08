import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, User} from '../../general-services/auth/auth.service';
import {DataService} from '../../general-services/data/data.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  constructor(private auth: AuthService, private data: DataService) {
  }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createList(title: string) {
    this.subscriptions.push(
      this.data.addNewList(title).subscribe(
        () => console.log('redirect'),
        (err) => console.log('error, do not redirect', err)
      )
  );
  }
}
