
import { Action } from "@ngrx/store";


// get post type
export const GET_POST_TYPE = '[Products] get post type';
export const GET_POST_TYPE_SUCCESS = '[Products] get post type Success';
export const GET_POST_TYPE_FAIL = '[Products] get post type Fail';

export const GET_ALL_POST_TYPE = '[Products] get all of post type';
export const GET_ALL_POST_TYPE_SUCCESS = '[Products] get all of post type success';
export const GET_ALL_POST_TYPE_FAIL = '[Products] get all of post type fail';

export class GetAllOfPostType implements Action {
	readonly type = GET_ALL_POST_TYPE;
	constructor(public payload: any) {}
}

export class GetAllOfPostTypeSuccess implements Action {
	readonly type = GET_ALL_POST_TYPE_SUCCESS;
	constructor(public payload: any) {}
}

export class GetAllOfPostTypeFail implements Action {
	readonly type = GET_ALL_POST_TYPE_FAIL;
	constructor(public payload: any) {}
}

export class GetPostType implements Action {
  readonly type = GET_POST_TYPE;
  constructor(public payload: any) {}
}


export class GetPostTypeFail implements Action {
  readonly type = GET_POST_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class GetPostTypeSuccess implements Action {
  readonly type = GET_POST_TYPE_SUCCESS;
  constructor(public payload: any[]) {}
}

// action types
export type PostTypeAction =
GetPostType
| GetPostTypeFail
| GetPostTypeSuccess
| GetAllOfPostType
| GetAllOfPostTypeSuccess
| GetAllOfPostTypeFail;