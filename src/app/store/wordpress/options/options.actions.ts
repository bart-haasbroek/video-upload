
import { Action } from "@ngrx/store";


// load options
export const LOAD_OPTIONS = '[Products] Load options';
export const LOAD_OPTIONS_SUCCESS = '[Products] Load options success';
export const LOAD_OPTIONS_FAIL = '[Products] Load options fail';

export class LoadOptions implements Action {
	readonly type = LOAD_OPTIONS;
}

export class LoadOptionsSuccess implements Action {
	readonly type = LOAD_OPTIONS_SUCCESS;
	constructor(public payload: any) {}
}

export class LoadOptionsFail implements Action {
	readonly type = LOAD_OPTIONS_FAIL;
	constructor(public payload: any) {}
}

// action types
export type OptionsAction = LoadOptions | LoadOptionsSuccess | LoadOptionsFail;