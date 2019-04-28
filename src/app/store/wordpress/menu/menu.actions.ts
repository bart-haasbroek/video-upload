
import { Action } from "@ngrx/store";

// load options
export const LOAD_MENU = '[Products] Load menu';
export const LOAD_MENU_SUCCESS = '[Products] Load menu success';
export const LOAD_MENU_FAIL = '[Products] Load menu fail';

export class LoadMenu implements Action {
	readonly type = LOAD_MENU;
	constructor(public payload: any) {}
}

export class LoadMenuSuccess implements Action {
	readonly type = LOAD_MENU_SUCCESS;
	constructor(public payload: any) {}
}

export class LoadMenuFail implements Action {
	readonly type = LOAD_MENU_FAIL;
	constructor(public payload: any) {}
}

// action types
export type MenuAction = LoadMenu | LoadMenuSuccess | LoadMenuFail;