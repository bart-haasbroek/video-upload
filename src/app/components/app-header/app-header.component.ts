import { Component, Input } from '@angular/core';
import { Router, CanActivate, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: 'app-header.component.html',
	styleUrls: ['app-header.component.scss']
})

export class AppHeaderComponent {
	public mobileMenuActive: boolean = false;
	@Input() headerImage: string;

	constructor(
		private router: Router,
	) {}
}

