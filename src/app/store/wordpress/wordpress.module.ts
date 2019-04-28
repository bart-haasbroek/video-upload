import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { wordpressReducers } from './wordpress.reducers';
import { wordpressEffects } from './wordpress.effects';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forFeature('wordpress', wordpressReducers),
		EffectsModule.forFeature(wordpressEffects),
	],
	declarations: [],
	exports: [],
})
export class WordpressFeatureModule { }