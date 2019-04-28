import { createSelector } from '@ngrx/store';
import * as fromFeature from '../wordpress.reducers';
import * as fromOptions from '../options/options.selectors';

export const getMenuState = createSelector(
	fromFeature.getWordpressState,
	(state: fromFeature.WordpressState) => state.menu
);

export const getMainMenu = createSelector(
	getMenuState,
	(menus) => {
		return menus.entities['menu'];
	}
);