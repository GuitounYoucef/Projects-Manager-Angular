import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
