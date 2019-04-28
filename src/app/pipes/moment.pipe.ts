/**********************************************
 * Requires:                                  *
 * - 'moment' module                          *
 **********************************************/


import { Pipe, Injectable } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'moment',
})
@Injectable()
export class PipeMoment {

	constructor() {
		moment.locale('nl');
	}

	transform(value: moment.Moment, args?: any): string {
		return moment(value).format(args || 'D MMMM YYYY').replace('.', '');
	}
}
