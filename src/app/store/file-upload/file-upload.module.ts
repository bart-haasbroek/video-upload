import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromFileUpload from './file-upload.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FileUploadEffects } from './file-upload.effects';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('file-upload', fromFileUpload.fileUploadReducer),
		EffectsModule.forFeature([FileUploadEffects])
	]
})
export class FileUploadFeatureModule { }
