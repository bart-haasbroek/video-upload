import * as fromOptions from './options.actions';


export interface OptionsState {
	options: any;
	loaded: boolean;
	loading: boolean;
}

export const initialOptionsState: OptionsState = {
	options: {},
	loaded: false,
	loading: false,
};


export function optionsReducer(
	state = initialOptionsState,
	action: fromOptions.OptionsAction
): OptionsState {
	switch (action.type) {
		case fromOptions.LOAD_OPTIONS: {
			return {
				...state,
				loading: true,
			};
		}
		case fromOptions.LOAD_OPTIONS_SUCCESS: {
			const options = action.payload.reduce(
				(options: any, page: any) => {
					return {
						...options,
						...page
					};
				},
				{
					...state.options,
				}
			);

			return {
				...state,
				options,
				loading: false
			};
		}
	}
	return state;
}

export const getOptions = (state: any) => state.options;
export const getOptionsLoadedState = (state: any) => state.loaded;