import { createSelector } from '@ngrx/store';
import * as fromFeature from '../wordpress.reducers';
import * as fromPosttypes from '../post-types/post-types.reducer';
import { getRouterState } from '../../shared';

export const getPosttypesState = createSelector(
	fromFeature.getWordpressState,
	(state: fromFeature.WordpressState) => state.postTypes
);

export const getPostTypesList = createSelector(
	getPosttypesState,
	fromPosttypes.getStatePostTypesList
);

export const getPortfolioItems = createSelector(
	getPostTypesList,
	(postType) => {
		if (!!!postType['portfolio']) {
			return {};
		}
		return postType['portfolio'];
	}
);