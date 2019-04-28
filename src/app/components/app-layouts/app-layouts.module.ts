import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { LayoutComponent } from './components/layout-component/layout-component';
import { OneColumnLayout } from './components/one-column-layout/one-column-layout';
import { TwoColumnLayout } from './components/two-column-layout/two-column-layout';
import { ThreeColumnLayout } from './components/three-column-layout/three-column-layout';
import { TextImageLayout } from './components/text-image-layout/text-image-layout';
import { ContactLayout } from './components/contact-layout/contact-layout';

@NgModule({
	declarations: [
		TwoColumnLayout,
		OneColumnLayout,
		LayoutComponent,
		ThreeColumnLayout,
		TextImageLayout,
		ContactLayout,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
  	providers: [],
  	exports: [
		TwoColumnLayout,
		OneColumnLayout,
		LayoutComponent,
		ThreeColumnLayout,
		TextImageLayout,
		ContactLayout,
	],
	entryComponents: [
		TwoColumnLayout,
		OneColumnLayout,
		ThreeColumnLayout,
		TextImageLayout,
		ContactLayout,
	]
})
export class AppLayoutsModule {}