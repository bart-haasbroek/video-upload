import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'mobile-nav',
	templateUrl: 'mobile-nav.component.html',
	styleUrls: ['mobile-nav.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class MobileNavComponent {
	@Input() menu: any;
	@Input() logo: string;
	public mobileMenuActive: boolean = false;

	constructor(
		private router: Router,
	) {}

	public toggleMenu(): void {
		this.mobileMenuActive = !this.mobileMenuActive;

		if (this.mobileMenuActive) {
			document.body.setAttribute('style', 'overflow: hidden');
		} else {
			document.body.removeAttribute("style");
		}
	}
}

