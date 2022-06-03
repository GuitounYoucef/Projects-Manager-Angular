import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'Projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'ProjectDetail/:annee/:num', component: ProjectDetailComponent, canActivate: [AuthGuard] }, 
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/home/Projects', pathMatch: 'full' }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
