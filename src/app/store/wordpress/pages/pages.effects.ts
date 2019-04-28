import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as pagesActions from './pages.actions';
import * as optionsActions from '../options/options.actions';
import * as menuActions from '../menu/menu.actions';
import { PostTypeService } from '../../../services/post-types.services';

@Injectable()
export class PagesEffects {
	constructor(
		private actions$: Actions,
		private pagesService: PostTypeService
	) { }

	@Effect()
	loadPages$ = this.actions$.ofType(pagesActions.LOAD_PAGES).pipe(
		switchMap(() => {
			return this.pagesService
				.getPages()
				.pipe(
					mergeMap((pages: any) => [
						new pagesActions.LoadPagesSuccess(pages),
						new optionsActions.LoadOptions(),
						new menuActions.LoadMenu('menu')
					]),
					catchError(error => of(new pagesActions.LoadPagesFail(error)))
				);
		})
	);
}