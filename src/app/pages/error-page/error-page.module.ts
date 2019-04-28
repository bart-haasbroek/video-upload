import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';

import { SharedModule } from '../../modules/shared.module';


export const ROUTES: Routes = [
  { path: '', component: ErrorPageComponent }
];

@NgModule({
  imports: [
	CommonModule,
	SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    ErrorPageComponent
  ]
})
export class ErrorPageComponentModule {}