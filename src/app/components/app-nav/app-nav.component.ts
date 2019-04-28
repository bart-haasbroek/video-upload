import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nav',
	templateUrl: 'app-nav.component.html',
	styleUrls: ['app-nav.component.scss']
})

export class AppNavComponent {
	@Input() menu: any;

	constructor(
		private router: Router,
	) {}
}

