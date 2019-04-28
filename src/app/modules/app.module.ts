import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// store
import { StoreModule, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Core
import { environment } from '../../environments/environment';
import { AppComponent } from '../main/app.component';

// modules
import { ProvidersModule } from '../services/services.module';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from '../routes/app-routing.module';

//translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateModule } from '../store/store.module';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		SharedModule,
		StateModule.forRoot(),
		ProvidersModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		AngularFireModule.initializeApp({
			apiKey: "AIzaSyBHPX56F0gvDYeNSVz7CCs6sQOrHNWQXMI",
			authDomain: "video-taart.firebaseapp.com",
			storageBucket: "video-taart.appspot.com",
			projectId: "video-taart",
		}),
		AngularFireStorageModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	exports: [
		ProvidersModule
	],
	providers: [
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
