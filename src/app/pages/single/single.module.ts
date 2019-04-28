import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingleComponent } from './single.component';

import { SharedModule } from '../../modules/shared.module';


export const ROUTES: Routes = [
  { path: '', component: SingleComponent }
];

@NgModule({
  imports: [
	CommonModule,
	SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    SingleComponent
  ]
})
export class SingleComponentModule {}