import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/wordpress';

@Component({
	selector: 'single-component',
	templateUrl: 'single.component.html',
	styleUrls: ['single.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleComponent implements OnInit {
	public menu$: any;
	public pageContent$: any;

	constructor(
		private store: Store<fromStore.WordpressState>
	) {}

	 ngOnInit() {
		this.menu$ = this.store.select(fromStore.getMainMenu);
		this.pageContent$ = this.store.select(fromStore.getPostBySlug);
	 }
}