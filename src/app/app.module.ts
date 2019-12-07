import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {InventoryListComponent} from './inventory-list/inventory-list.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './auth/auth.service';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    HomeComponent,
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
    MatCardModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
