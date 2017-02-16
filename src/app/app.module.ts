// import { SearchService } from './search/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';

import {
         SearchComponent,
         UsersListComponent,
         UsersSearchFormComponent,
         UserProfileComponent } from './components';



@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersSearchFormComponent,
    UserProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
