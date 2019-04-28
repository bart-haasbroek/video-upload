import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'error-page',
	templateUrl: 'error-page.component.html',
	styleUrls: ['error-page.component.scss']
})

export class ErrorPageComponent implements OnInit {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('en');
		translate.use('nl');
	 }

	ngOnInit() { }
}