import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
  {
    path: 'auth',
    loadChildren: () => import('./Components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'auth-second',
    loadChildren: () => import('./Components/auth2/auth2.module').then(m => m.Auth2Module)
  },
  {
    path: 'home',
    loadChildren: () => import('./Components/main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
