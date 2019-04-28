import { Component, HostBinding, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/wordpress';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public menu$: any;
	public pages$: any;
	public posts$: any;
	public portfolio$: any;

	constructor(
		private router: Router,
		public translate: TranslateService,
		public store: Store<fromStore.WordpressState>,
	) {
		translate.setDefaultLang('en');
		translate.use('en');
	}

	ngOnInit() {
	}

	public getRouterOutletState(outlet) {
		console.log('outlet', outlet);
		return outlet.isActivated ? outlet.activatedRoute : '';
	}
}
