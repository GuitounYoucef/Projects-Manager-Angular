import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './modules/home/components/projects/projects.component';
import { ProjectDetailComponent } from './modules/home/components/project-detail/project-detail.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { NavBarComponent } from './modules/home/components/nav-bar/nav-bar.component';
import { HeaderComponent } from './modules/home/components/header/header.component';


import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ProjectDetailDialogComponent } from './modules/home/components/project-detail-dialog/project-detail-dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {MatCardModule} from '@angular/material/card';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './modules/home/components/users/users.component';
import { HttpClientInterceptor } from './Httpinterceptor/HttpInterceptor';
import { UsersDialogComponent } from './modules/home/components/users-dialog/users-dialog.component';
import { ProjectdialogComponent } from './modules/home/components/projectdialog/projectdialog.component';





@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    ProjectdialogComponent,
    ProjectDetailDialogComponent,
    AuthComponent,
    UsersComponent,
    UsersDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    NgxWebstorageModule.forRoot(),
        
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
