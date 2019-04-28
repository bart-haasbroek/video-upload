import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { ModalComponent } from '../components/modal/modal.component';
import { AppNavComponent } from '../components/app-nav/app-nav.component';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { AppFooterComponent } from '../components/app-footer/app-footer.component';
import { MobileNavComponent } from '../components/mobile-nav/mobiel-nav.component';


//translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppLayoutsModule } from '../components/app-layouts/app-layouts.module';

//pipes
import { PipeMoment } from '../pipes/moment.pipe';
import { UploadButtonComponent } from '../components/upload-button/upload-button.component';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		AppLayoutsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		})
	],
	declarations: [
		ModalComponent,
		AppHeaderComponent,
		AppFooterComponent,
		AppNavComponent,
		MobileNavComponent,
		UploadButtonComponent,

		//pipes
		PipeMoment
	],
	exports: [
		TranslateModule,
		ModalComponent,
		AppHeaderComponent,
		AppFooterComponent,
		AppNavComponent,
		MobileNavComponent,
		AppLayoutsModule,
		ReactiveFormsModule,
		UploadButtonComponent,

		//pipes
		PipeMoment
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
		};
	}
}
