import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as postsTypeActions from './post-types.actions';
import { PostTypeService } from '../../../services/post-types.services';

@Injectable()
export class PostTypesEffects {
	constructor(
		private actions$: Actions,
		private postTypeService: PostTypeService
	) { }

	@Effect()
	loadPostTypes$ = this.actions$.ofType(postsTypeActions.GET_ALL_POST_TYPE).pipe(
		switchMap((args: any) => {
			const postType: string = args.payload;
			return this.postTypeService
				.getPostTypeList(postType)
				.pipe(
					map(posts => {
						const args: any = {
							postType: postType,
							result: posts
						};
						return new postsTypeActions.GetAllOfPostTypeSuccess(args)
					}),
					catchError(error => of(new postsTypeActions.GetAllOfPostTypeFail(error)))
				);
		})
	);
}