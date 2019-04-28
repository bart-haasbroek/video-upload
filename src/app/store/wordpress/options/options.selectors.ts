import { createSelector } from '@ngrx/store';
import * as fromFeature from '../wordpress.reducers';
import * as fromOptions from './options.reducer';

export const getOptionsState = createSelector(
	fromFeature.getWordpressState,
	(state: fromFeature.WordpressState) => state.options
);

export const getOptionsLoaded = createSelector(
	getOptionsState,
	fromOptions.getOptionsLoadedState
);