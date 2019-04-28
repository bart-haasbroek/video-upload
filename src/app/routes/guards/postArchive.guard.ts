import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PostTypeService } from '../../services/post-types.services';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../app/store/wordpress';


@Injectable()
export class PostArchiveGuard implements CanActivate {

	constructor(
		private store: Store<fromStore.WordpressState>,
		private router: Router,
		private postTypeService: PostTypeService
	) { }

	canActivate(route: ActivatedRouteSnapshot) {
		const { queryParams } = route.root;
		const pageNumber: number = Object.keys(queryParams).length ? queryParams.page : 1;
		return this.checkStore(pageNumber).pipe(
			switchMap(() => of(true)),
      		catchError(() => of(false))
		);
	}

	checkStore(pageNumber: number): Observable<boolean> {
		return this.store.select(fromStore.getPostsPaginationMap).pipe(
			tap(paginationMap => {
				if (!paginationMap || !!!paginationMap[pageNumber]) {
					this.store.dispatch(new fromStore.LoadNewPosts(pageNumber));
				}
			}),
			filter(paginationMap => !!Object.keys(paginationMap).length),
			take(1)
		);
	}
}