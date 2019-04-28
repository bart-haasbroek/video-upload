import { NgModule } from '@angular/core';

//api
import { ApiGateway } from './api/api-gateway';

//services
import { PostTypeService } from './post-types.services';
import { GeneralService } from './general.service';

// API providers

@NgModule({
	providers: [
		ApiGateway,
		PostTypeService,
		GeneralService
	],
})
export class ProvidersModule {}
