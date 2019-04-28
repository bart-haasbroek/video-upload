/***************************************************
 * App settings for API, S3, GoogleAnalytics, etc. *
 ***************************************************/

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

let MENU_URL: string = 'http://localhost:8888/wpBase/wp-json/menus/';

const baseUrl: string = environment.baseUrl;
//const baseUrl: string = 'http://localhost:8888/wpBase/';
//const testLiveUrl: string = 'http://www.digitalbart.nl/wptest/'
const wpUrl: string = baseUrl + 'wp-json/wp/v2/';
const acfUrl: string = baseUrl + 'wp-json/acf/v3/';

@Injectable()
export class Settings {
	public static pageEndpoint: string = wpUrl + 'pages';
	public static postEndpoint: string = wpUrl + 'posts';
	public static postTypeEndpoint: string = wpUrl;
	public static acfEndpoint: string = acfUrl;
	public static menuEnpoint: string = baseUrl + 'wp-json/menus/';
	public static mail: string = baseUrl + 'wp-json/contact/mail';
}
