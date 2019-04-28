
import {
	ActionReducerMap,
	createSelector,
	createFeatureSelector,
} from '@ngrx/store';

import * as fromPages from './pages/pages.reducer';
import * as fromOptions from './options/options.reducer';
import * as fromMenu from './menu/menu.reducer';
import * as fromPosts from './posts/posts.reducer';
import * as fromPostTypes from './post-types/post-types.reducer';

export interface WordpressState {
	pages: fromPages.PagesState;
	options: fromOptions.OptionsState;
	menu: fromMenu.MenuState,
	posts: fromPosts.PostsState,
	postTypes: fromPostTypes.PostTypeState
}

export const wordpressReducers: ActionReducerMap<WordpressState> = {
	pages: fromPages.pagesReducer,
	options: fromOptions.optionsReducer,
	menu: fromMenu.menuReducer,
	posts: fromPosts.postsReducer,
	postTypes: fromPostTypes.postTypeReducer
};

export const getWordpressState = createFeatureSelector<WordpressState>('wordpress');