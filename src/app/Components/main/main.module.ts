import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormatTextPipe } from '../../pipes/format-text.pipe';

const routes: Routes = [
  { path: '', component: MainComponent }
];

@NgModule({

  declarations: [
    MainComponent,
    FormatTextPipe
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
