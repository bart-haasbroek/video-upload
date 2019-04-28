import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

export class ApiGatewayOptions {
	method: string;
	url: string;
	headers: any;
	params: any = {};
	data: any = {};
	getResponseHeader?: boolean = false;
}

@Injectable()
export class ApiGateway {
	// Provide the *public* Observable that clients can subscribe to
	errors$: Observable<any>;

	// Define the internal Subject we'll use to push the command count
	private pendingCommandsSubject: any = new Subject<number>();
	private pendingCommandCount: number = 0;

	private pendingRequestsCount: number = 0;

	// Provide the *public* Observable that clients can subscribe to
	pendingCommands$: Observable<number>;

	constructor(
		private http: HttpClient,
	) {
		// Create our observables from the subjects
		this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
	}

	// I perform a GET request to the API, appending the given params
	// as URL search parameters. Returns a stream.
	get(url: string, params?: any, hideLoader?: boolean, requestOptions?: any): Observable<any> {
		requestOptions = requestOptions || {};
		let options: any = new ApiGatewayOptions();
		options.method = 'get';
		options.url = url;
		options.getResponseHeader = !!requestOptions['getResponseHeader'];
		if (params) {
			options.params = params;
			options.headers = params.headers;
			delete params.headers;
		}

		return this.request(options, hideLoader);
	}


	// I perform a POST request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	post(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: any = new ApiGatewayOptions();
		options.method = 'post';
		options.url = url;
		options.params = params;
		options.data = data;

		return this.request(options, hideLoader);
	}

	// I perform a PUT request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	put(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: any = new ApiGatewayOptions();
		options.method = 'put';
		options.url = url;
		options.params = params;
		options.data = data;
		return this.request(options, hideLoader);
	}

	// I perform a DELETE request to the API. If both the params and data
	// are present, the params will be appended as URL search parameters
	// and the data will be serialized as a JSON payload. If only the
	// data is present, it will be serialized as a JSON payload. Returns
	// a stream.
	delete(url: string, params: any, data: any, hideLoader?: boolean): Observable<any> {
		if (!data) {
			data = params;
			params = {};
		}
		let options: any = new ApiGatewayOptions();
		options.method = 'delete';
		options.url = url;
		options.params = params;
		options.data = data;

		return this.request(options, hideLoader);
	}

	private request(options: ApiGatewayOptions, hideLoader?: boolean): Observable<any> {
		options.method = (options.method || 'get');
		options.url = (options.url || '');
		options.headers = (options.headers || {});
		options.params = (options.params || {});
		options.data = (options.data || {});
		options.getResponseHeader = (options.getResponseHeader || false);

		this.interpolateUrl(options);
		//this.addXsrfToken(options);
		this.addContentType(options);

		let requestOptions: any = {};
		requestOptions.method = options.method;
		requestOptions.url = options.url;
		requestOptions.headers = options.headers;
		requestOptions.params = this.buildHttpParams(options.params);
		requestOptions.body = JSON.stringify(options.data);
		if (options.getResponseHeader) {
			requestOptions['observe'] = 'response';
		}

		requestOptions.headers['Authorization'] = 'Basic ' + btoa('bart:Y6ob6lvo');
		// let token: any = this.authToken;
		// if (token) {
		// 	requestOptions.headers['Authorization'] = 'Bearer ' + token;
		// }

		let isCommand: any = (options.method !== 'get');

		if (isCommand) {
			this.pendingCommandsSubject.next(++this.pendingCommandCount);
		}

		this.pendingRequestsCount++;

		let stream: any = this.http.request(options.method, options.url, requestOptions);
		return stream;
	}

	private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
		if (options.method !== 'get') {
			options.headers['Content-Type'] = 'application/json; charset=UTF-8';
		}
		return options;
	}

	private extractValue(collection: any, key: string): any {
		let value: any = collection[key];
		delete (collection[key]);
		return value;
	}


	private buildHttpParams(params: any): any {
		let searchParams: any = {};
		for (let key in params) {
			searchParams[key] = params[key];
		}
		return searchParams;
	}

	private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
		options.url = options.url.replace(
			/:([a-zA-Z]+[\w-]*)/g,
			($0: any, token: any) => {
				// Try to move matching token from the params collection.
				if (options.params.hasOwnProperty(token)) {
					return (this.extractValue(options.params, token));
				}
				// Try to move matching token from the data collection.
				if (options.data.hasOwnProperty(token)) {
					return (this.extractValue(options.data, token));
				}
				// If a matching value couldn't be found, just replace
				// the token with the empty string.
				return ('');
			},
		);
		// Clean up any repeating slashes.
		//options.url = options.url.replace(/\/{2,}/g, '/');
		// Clean up any trailing slashes.
		options.url = options.url.replace(/\/+$/g, '');

		return options;
	}

	get authToken() {
		return localStorage.getItem('auth-token') || -1;
	}
}