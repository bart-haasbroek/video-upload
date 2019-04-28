
import { Action } from "@ngrx/store";


// load pizzas
export const LOAD_PAGES = '[Products] Load pages';
export const LOAD_PAGES_FAIL = '[Products] Load pages Fail';
export const LOAD_PAGES_SUCCESS = '[Products] Load pages Success';

export class LoadPages implements Action {
  readonly type = LOAD_PAGES;
}

export class LoadPagesFail implements Action {
  readonly type = LOAD_PAGES_FAIL;
  constructor(public payload: any) {}
}

export class LoadPagesSuccess implements Action {
  readonly type = LOAD_PAGES_SUCCESS;
  constructor(public payload: any[]) {}
}

// action types
export type PagesAction = LoadPages | LoadPagesFail | LoadPagesSuccess;