import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PostTypeService } from '../../services/post-types.services';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../app/store/wordpress';


@Injectable()
export class PostExistGuard implements CanActivate {

	constructor(
		private store: Store<fromStore.WordpressState>,
		private router: Router,
		private postTypeService: PostTypeService
	) { }

	canActivate(route: ActivatedRouteSnapshot) {
		return this.checkStore().pipe(
			switchMap(() => {
				const id = parseInt(route.params.id);
				return this.hasPost(id);
			})
		);
	}

	hasPost(id: number): Observable<boolean> {
		return this.store
			.select(fromStore.getPostsEntities)
			.pipe(
				map((entities: { [key: number]: any }) => !!entities[id]),
				take(1)
			);
	}

	checkStore(): Observable<boolean> {
		return this.store.select(fromStore.getPostsLoaded).pipe(
			tap(loaded => {
				if (!loaded) {
					this.store.dispatch(new fromStore.LoadPosts());
				}
			}),
			filter(loaded => loaded),
			take(1)
		);
	}
}