import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as optionsActions from './options.actions';
import { GeneralService } from '../../../services/general.service';

@Injectable()
export class OptionsEffects {
	constructor(
		private actions$: Actions,
		private generalService: GeneralService
	) { }

	@Effect()
	loadOptions$ = this.actions$.ofType(optionsActions.LOAD_OPTIONS).pipe(
		switchMap(() => {
			return this.generalService
				.getOptions()
				.pipe(
					map(options => {
						return new optionsActions.LoadOptionsSuccess(options)
					}),
					catchError(error => of(new optionsActions.LoadOptionsFail(error)))
				);
		})
	);
}