
import { Action } from "@ngrx/store";


// load posts
export const LOAD_POSTS = '[Products] Load posts';
export const LOAD_POSTS_FAIL = '[Products] Load posts Fail';
export const LOAD_POSTS_SUCCESS = '[Products] Load posts Success';

export class LoadPosts implements Action {
	readonly type = LOAD_POSTS;
}

export class LoadPostsFail implements Action {
	readonly type = LOAD_POSTS_FAIL;
	constructor(public payload: any) { }
}

export class LoadPostsSuccess implements Action {
	readonly type = LOAD_POSTS_SUCCESS;
	constructor(public payload: any[]) { }
}


//Load new posts
export const LOAD_NEW_POSTS = '[Products] Load new posts';
export const LOAD_NEW_POSTS_FAIL = '[Products] Load new posts Fail';
export const LOAD_NEW_POSTS_SUCCESS = '[Products] Load new posts Success';

export class LoadNewPosts implements Action {
	readonly type = LOAD_NEW_POSTS;
	constructor(public payload: any) { }
}

export class LoadNewPostsFail implements Action {
	readonly type = LOAD_NEW_POSTS_FAIL;
	constructor(public payload: any) { }
}

export class LoadNewPostsSuccess implements Action {
	readonly type = LOAD_NEW_POSTS_SUCCESS;
	constructor(public payload: any) { }
}

//pagination
export const TO_NEXT_POST_PAGE = '[Products] to next post page';
export const TO_PREV_POST_PAGE = '[Products] to prev post page';

export class ToNextPostPage implements Action {
	readonly type = TO_NEXT_POST_PAGE;
}

export class ToPrevPostPage implements Action {
	readonly type = TO_PREV_POST_PAGE;
}

// action types
export type PostsAction =
LoadPosts
| LoadPostsFail
| LoadPostsSuccess
| LoadNewPosts
| LoadNewPostsFail
| LoadNewPostsSuccess
| ToNextPostPage
| ToPrevPostPage;


// click on post
// maken action --> set active post
// in post fetch the active post

//threat --> what is refresh on single, active is not set