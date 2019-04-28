import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as menuActions from './menu.actions';
import { GeneralService } from '../../../services/general.service';

@Injectable()
export class MenuEffects {
	constructor(
		private actions$: Actions,
		private generalService: GeneralService
	) { }

	@Effect()
	loadMenu$ = this.actions$.ofType(menuActions.LOAD_MENU).pipe(
		switchMap((menu: any) => {
			const menuName: string = menu.payload;
			return this.generalService
				.getAppMenu(menuName)
				.pipe(
					map(menuItems => {
						const menu: any = {
							name: menuName,
							items: menuItems
						}
						return new menuActions.LoadMenuSuccess(menu);
					}),
					catchError(error => of(new menuActions.LoadMenuFail(error)))
				);
		})
	);
}