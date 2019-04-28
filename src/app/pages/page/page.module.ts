import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';


import { SharedModule } from '../../modules/shared.module';


export const ROUTES: Routes = [
  { path: '', component: PageComponent }
];

@NgModule({
  imports: [
	CommonModule,
	SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    PageComponent
  ]
})
export class PageComponentModule {}