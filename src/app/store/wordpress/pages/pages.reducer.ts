import * as fromPages from './pages.actions';


export interface PagesState {
	entities: { [id: number]: any };
	loaded: boolean;
	loading: boolean;
}

export const initialPagesState: PagesState = {
	entities: {},
	loaded: false,
	loading: false,
};


export function pagesReducer(
	state = initialPagesState,
	action: fromPages.PagesAction
): PagesState {
	switch (action.type) {
		case fromPages.LOAD_PAGES: {
			return {
				...state,
				loading: true,
			};
		}

		case fromPages.LOAD_PAGES_SUCCESS: {
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

		case fromPages.LOAD_PAGES_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false,
			};
		}
	}
	return state;
}

export const getStatePagesEntities = (state: any) => state.entities;
export const getStatePagessLoading = (state: any) => state.loading;
export const getStatePagesLoaded = (state: any) => state.loaded;