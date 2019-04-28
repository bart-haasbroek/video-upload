import * as fromPostType from './post-types.actions';


export interface PostTypeState {
	list: {
		[name: string]: {
			[id: number]: any
		}
	};
	loaded: boolean;
	loading: boolean;
}

export const initialPosttypesState: PostTypeState = {
	list: {},
	loaded: false,
	loading: false,
};

export function postTypeReducer(
	state = initialPosttypesState,
	action: fromPostType.PostTypeAction
): PostTypeState {
	switch (action.type) {
		case fromPostType.GET_ALL_POST_TYPE: {
			return {
				...state,
				loading: true,
			};
		}

		case fromPostType.GET_ALL_POST_TYPE_SUCCESS: {
			const postType = action.payload.postType;
			const result: any = action.payload.result;
			const postTypeResult = result.reduce(
				(entities: { [id: number]: any }, page: any) => {
					return {
						...entities,
						[page.id]: page,
					};
				},
				{
					...state.list[postType],
				}
			);
			const postTypeList: any = {
				...state.list,
				[postType]: postTypeResult
			};
			return {
				...state,
				loading: false,
				loaded: true,
				list: postTypeList
			};
		}

		case fromPostType.GET_POST_TYPE_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false,
			};
		}
	}
	return state;
}

export const getStatePostTypesList = (state: any) => state.list;
export const getPostTypeLoading = (state: any) => state.loading;
export const getPostTypeLoaded = (state: any) => state.loaded;