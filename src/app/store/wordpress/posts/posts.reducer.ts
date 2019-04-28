import * as fromPosts from './posts.actions';


export interface PostsState {
	entities: { [id: number]: any };
	pagedData: { [pages: number]: number[] };
	totalPages: number,
	currentPage: number,
	isFirstPage: boolean,
	isLastPage: boolean,
	loaded: boolean;
	loading: boolean;
}

export const initialPostsState: PostsState = {
	entities: {},
	pagedData: {},
	totalPages: 0,
	currentPage: 1,
	isFirstPage: true,
	isLastPage: false,
	loaded: false,
	loading: false,
};

export function postsReducer(
	state = initialPostsState,
	action: fromPosts.PostsAction
): PostsState {
	switch (action.type) {
		case fromPosts.LOAD_POSTS: {
			return {
				...state,
				loading: true,
			};
		}

		case fromPosts.LOAD_NEW_POSTS: {
			return {
				...state,
				loading: true,
				loaded: false
			};
		}

		case fromPosts.LOAD_POSTS_SUCCESS: {
			const pages = action.payload;
			const entities = pages.reduce(
				(entities: { [id: number]: any }, page: any) => {
					return {
						...entities,
						[page.id]: page,
					};
				},
				{
					...state.entities,
				}
			);

			return {
				...state,
				loading: false,
				loaded: true,
				entities,
			};
		}

		case fromPosts.LOAD_POSTS_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false,
			};
		}

		case fromPosts.LOAD_NEW_POSTS_SUCCESS: {
			const posts = action.payload.posts;
			const PageNumber: string = action.payload.pageNumber;
			const postsOfPage: number[] = posts.map((post: any) => post.id);
			const pagedData: any = {
				...state.pagedData,
				[PageNumber]: postsOfPage,
			};

			const entities = posts.reduce(
				(entities: { [id: number]: any }, page: any) => {
					return {
						...entities,
						[page.id]: page,
					};
				},
				{
					...state.entities,
				}
			);

			return {
				...state,
				loading: false,
				loaded: true,
				entities,
				pagedData,
				totalPages: parseInt(action.payload.maxPages),
				currentPage: parseInt(action.payload.pageNumber)
			};
		}

		case fromPosts.TO_NEXT_POST_PAGE: {
			// update pagenumber by one. if is higher than total pages, pagenumber equel to totalpages
			const pageNumber: any = Math.min(state.currentPage + 1, state.totalPages);

			return {
				...state,
				loading: false,
				loaded: true,
				isFirstPage: false,
				isLastPage: pageNumber === state.totalPages,
				currentPage: pageNumber
			};
		}

		case fromPosts.TO_PREV_POST_PAGE: {
			// update pagenumber by one. if is less than 1, pagenumber equel to totalpages
			const pageNumber: any = Math.max(state.currentPage - 1, 1);

			return {
				...state,
				loading: false,
				loaded: true,
				isFirstPage: pageNumber === 1,
				isLastPage: false,
				currentPage: pageNumber
			};
		}
	}
	return state;
}

export const getStatePostsEntities = (state: any) => state.entities;
export const getStatePostsPagedData = (state: any) => state.pagedData;
export const getStatePostsLoading = (state: any) => state.loading;
export const getStatePostsLoaded = (state: any) => state.loaded;