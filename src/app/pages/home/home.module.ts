import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { SharedModule } from '../../modules/shared.module';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
	CommonModule,
	SharedModule,
  RouterModule.forChild(ROUTES),
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeComponentModule {}