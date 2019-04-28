import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, withLatestFrom, filter, take, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import * as postsActions from './posts.actions';
import { PostTypeService } from '../../../services/post-types.services';
import { Store } from '@ngrx/store';
import * as FromStore from '../wordpress.reducers';
import * as FromPosts from './posts.selectors';

@Injectable()
export class PostsEffects {
	constructor(
		private actions$: Actions,
		private postsService: PostTypeService,
		private store: Store<FromStore.WordpressState>
	) { }

	@Effect()
	loadPosts$ = this.actions$.ofType(postsActions.LOAD_POSTS).pipe(
		switchMap(() => {
			return this.postsService
				.getPosts()
				.pipe(
					map(options => {
						return new postsActions.LoadPostsSuccess(options)
					}),
					catchError(error => of(new postsActions.LoadPostsFail(error)))
				);
		})
	);

	@Effect()
	loadNewPosts$ = this.actions$.ofType(postsActions.LOAD_NEW_POSTS).pipe(
		switchMap((action: any) => {
			const payload: number = action.payload;
			return this.postsService
				.getPostsOfPage(payload)
				.pipe(
					map(response => {
						const maxPages: any = response.headers.get('X-WP-TotalPages');
						const maxPosts: any = response.headers.get('X-WP-Total');
						const posts: any = response.body;
						const args: any = {
							posts: posts,
							pageNumber: payload,
							maxPages,
							maxPosts
						}
						return new postsActions.LoadNewPostsSuccess(args);
					}),
					catchError(error => of(new postsActions.LoadNewPostsFail(error)))
				);
		})
	);

	@Effect({ dispatch: false })
	ToNextPostPage$ = this.actions$.ofType(postsActions.TO_NEXT_POST_PAGE).pipe(
		map((action: any) => action),
		withLatestFrom(this.store.select(FromPosts.getPostsPaginationInfo)),
		tap((next: any) => {
			const paginationInfo = next[1];
			const currentPage: any = paginationInfo.currentPage;
			const postsMap: any = paginationInfo.paginationMap;
			if (!!!postsMap[currentPage]) {
				this.store.dispatch(new postsActions.LoadNewPosts(currentPage));
			}
		})
	);

	@Effect({ dispatch: false })
	ToPrevPostPage$ = this.actions$.ofType(postsActions.TO_PREV_POST_PAGE).pipe(
		map((action: any) => action),
		withLatestFrom(this.store.select(FromPosts.getPostsPaginationInfo)),
		tap((next: any) => {
			const paginationInfo = next[1];
			const currentPage: any = paginationInfo.currentPage;
			const postsMap: any = paginationInfo.paginationMap;
			if (!!!postsMap[currentPage]) {
				this.store.dispatch(new postsActions.LoadNewPosts(currentPage));
			}
		})
	);
}