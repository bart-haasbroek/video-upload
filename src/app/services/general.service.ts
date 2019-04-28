import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ApiGateway } from './api/api-gateway';
import { Settings } from './api/settings'
import { PostTypeService } from './post-types.services';
import { pluck } from 'rxjs/operators';

@Injectable()
export class GeneralService {

	constructor(
		private apiGateway: ApiGateway,
		private postTypeService: PostTypeService
	) {
	}

	public getAppMenu(menuName: string): Observable<any> {
		return this.apiGateway.get(`${Settings.menuEnpoint}${menuName}`)
		.map((menu) => {
			let parentMenu: any[] = menu.filter((menuItem) => menuItem.parent_id === '0');
			// If there are childitems, add them to the parent
			if (!!menu.find((menuItem) => menuItem.parent_id !== '0')) {
				return parentMenu.map((menuItem: any) => {
					let childItems: any[] = menu.filter((item: any) => parseInt(item.parent_id) === menuItem.id);
					if (childItems.length > 0) {
						return {...menuItem, hasSubmenu: true, submenu: childItems }
					} else {
						return menuItem;
					}
				});
			} else {
				return parentMenu;
			}
		});
	}

	public sendMail(data: any): Observable<any> {
		console.log('sending...', data);
		return this.apiGateway.post(`${Settings.mail}`, {}, data);
	}

	public sendMail2(): Observable<any> {
		return this.apiGateway.post(`${Settings.mail}2`, {}, {});
	}

	public getMail(): Observable<any> {
		let postData = {
			id: 213,
			naam: "myName123",
			_wpcf7_unit_tag: 'naam'
		}
		//return this.apiGateway.post(`http://www.digitalbart.nl/wptest/wp-json/contact-form-7/v1/contact-forms/55/refill`, {}, postData);
		return this.apiGateway.post(`http://localhost:8888/wpBase/wp-json/contact-form-7/v1/contact-forms/213/refill`, {}, {});
	}

	public getSiteOptions(name: string): Observable<any> {
   		return this.apiGateway.get(`${Settings.acfEndpoint}options/${name}`).pipe(
			   pluck('acf')
		)
	}

	public getOptions(): Observable<any> {
		return forkJoin(
			this.getSiteOptions('header-options'),
			this.getSiteOptions('footer-options'),
			this.getSiteOptions('contact-options')
		)
	}
}
