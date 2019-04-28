import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";

// reducers
import { appReducer, appMetaReducers } from './app.reducer';

//effects
import { appEffects } from './app.effects';
import { CustomSerializer } from './shared';

//utilities
//import { CustomSerializer } from "./shared/utils/utils";

import { WordpressFeatureModule } from './wordpress/wordpress.module';
import { FileUploadFeatureModule } from './file-upload/file-upload.module';


@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(appReducer, {
			metaReducers: appMetaReducers
		}),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forRoot(appEffects),
		WordpressFeatureModule,
		FileUploadFeatureModule,
		!environment.production ? StoreDevtoolsModule.instrument() : []
	],
})

export class StateModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: StateModule
	) {
		if (parentModule) {
			throw new Error(
				"StateModule is already loaded. Import it in the AppModule only"
			);
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: StateModule,
			providers: [
				{
					provide: RouterStateSerializer,
					useClass: CustomSerializer
				}
			]
		};
	}
}