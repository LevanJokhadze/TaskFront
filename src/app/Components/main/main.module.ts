import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: MainComponent }
];

@NgModule({

  declarations: [
    MainComponent
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
export class MainModule { }
