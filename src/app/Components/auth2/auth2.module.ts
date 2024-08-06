import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { Auth2Component } from './auth2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: Auth2Component }
];

@NgModule({

  declarations: [
    Auth2Component
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: [
  ],
})
export class Auth2Module { }
