import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ViewListComponent} from './inventory/view-list/view-list.component';
import {ManageListsComponent} from './inventory/manage-lists/manage-lists.component';
import {CreateListComponent} from './inventory/create-list/create-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'view-list/:id', component: ViewListComponent},
  {path: 'manage-list', component: ManageListsComponent},
  {path: 'create-list', component: CreateListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
