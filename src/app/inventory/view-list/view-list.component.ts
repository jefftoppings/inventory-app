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

  constructor(private auth: AuthService, private data: DataService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
  }
  user$: Observable<User>;
  subscriptions: Subscription[] = [];
  project$: Observable<InventoryProject>;
  items$: Observable<any>;

  private static getItemKey(project: InventoryProject, item: string) {
    let itemKey: string;
    for (const key in project.items) {
      if (project.items[key] === item) {
        itemKey = key;
        break;
      }
    }
    return itemKey;
  }

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.data.getProject(params.get('id'));
      })
    );
    this.items$ = this.project$.pipe(
      map(project => {
        const items: string[] = [];
        for (const key in project.items) {
          if (project.items.hasOwnProperty(key)) {
            items.push(project.items[key]);
          }
        }
        return items;
      })
    );
    this.subscriptions.push(
      this.project$.subscribe(),
      this.items$.subscribe()
    );
  }

  deleteItem(project: InventoryProject, item: string) {
    this.subscriptions.push(
      this.data.deleteItem(project, ViewListComponent.getItemKey(project, item)).subscribe(
        () => this.snackbar.open(`Successfully deleted ${item}`, 'Dismiss', {duration: 3000}),
        () => this.snackbar.open(`There was an error when deleting ${item}`, 'Dismiss', {duration: 3000}),
      )
    );
  }

  addItem(project: InventoryProject, newItem: string) {
    this.subscriptions.push(
      this.data.addItem(project, newItem).subscribe(
        () => this.snackbar.open(`Successfully added ${newItem}`, 'Dismiss', {duration: 3000}),
        () => this.snackbar.open(`There was an error adding ${newItem}`, 'Dismiss', {duration: 3000}),
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
