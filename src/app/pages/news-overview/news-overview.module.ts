import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsOverviewComponent } from './news-overview.component';


import { SharedModule } from '../../modules/shared.module';


export const ROUTES: Routes = [
	{ path: '', component: NewsOverviewComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(ROUTES),
	],
	declarations: [
		NewsOverviewComponent
	]
})
export class NewsOverviewComponentModule { }