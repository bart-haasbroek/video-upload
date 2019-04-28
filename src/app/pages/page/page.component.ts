import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/wordpress';

@Component({
	selector: 'page-component',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss']
})

export class PageComponent implements OnInit {
	public pageContent$: any;
	public menu$: any;

	constructor(
		private store: Store<fromStore.WordpressState>
	) {}

	ngOnInit() {
		this.menu$ = this.store.select(fromStore.getMainMenu);
		this.pageContent$ = this.store.select(fromStore.getPage);
	}
}