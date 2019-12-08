import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSidenavModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './general-services/auth/auth.service';
import {HomeComponent} from './home/home.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ManageListsComponent} from './inventory/manage-lists/manage-lists.component';
import {ViewListComponent} from './inventory/view-list/view-list.component';
import {CreateListComponent} from './inventory/create-list/create-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    WelcomeComponent,
    ManageListsComponent,
    ViewListComponent,
    CreateListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
