import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../general-services/data/data.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.scss']
})
export class ManageListsComponent implements OnInit, OnDestroy {
  projects$: Observable<any[]>;
  subscriptions: Subscription[] = [];

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.projects$ = this.data.projects;
    this.subscriptions.push(
      this.projects$.subscribe(console.log)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
