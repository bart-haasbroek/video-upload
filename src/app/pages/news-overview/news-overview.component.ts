import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/index';

@Component({
	selector: 'news-overview-component',
	templateUrl: 'news-overview.component.html',
	styleUrls: ['news-overview.component.scss']
})

export class NewsOverviewComponent implements OnInit {
	public pageContent$: any;
	public menu$: any;
	public posts;
	public paginationInfo: any;
	public isPostsLoading$: any;

	constructor(
		private store: Store<fromStore.WordpressState>
	) {}

	ngOnInit() {
		this.menu$ = this.store.select(fromStore.getMainMenu);
		this.pageContent$ = this.store.select(fromStore.getPageBySlug);
		this.posts = this.store.select(fromStore.getPostsOfCurrentPage);
		this.paginationInfo = this.store.select(fromStore.getPostsPaginationInfo);
		this.isPostsLoading$ = this.store.select(fromStore.getPostsLoading);
	}

	public next(): void {
		this.store.dispatch(new fromStore.ToNextPostPage);
	}

	public prev(): void {
		this.store.dispatch(new fromStore.ToPrevPostPage);
	}

	public toSingle(post): void {
		this.store.dispatch(
			new fromStore.Go({
				path: [`/nieuws/${post.id}/${post.slug}`]
			})
		);
	}
}