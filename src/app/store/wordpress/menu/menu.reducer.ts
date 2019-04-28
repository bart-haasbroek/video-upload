import * as fromMenu from './menu.actions';


export interface MenuState {
	entities: any;
	loaded: boolean;
	loading: boolean;
}

export const initialMenuState: MenuState = {
	entities: {},
	loaded: false,
	loading: false,
};


export function menuReducer(
	state = initialMenuState,
	action: fromMenu.MenuAction
): MenuState {
	switch (action.type) {
		case fromMenu.LOAD_MENU: {
			return {
				...state,
				loading: true,
			};
		}
		case fromMenu.LOAD_MENU_SUCCESS: {
			const menu: any = action.payload;
			const entities: any = {
				...state.entities,
				[menu.name]: menu.items
			};

			return {
				...state,
				entities,
				loading: false
			};
		}
	}
	return state;
}

export const getMenu = (state: any) => state.options;
export const getMenuLoaded = (state: any) => state.loaded;