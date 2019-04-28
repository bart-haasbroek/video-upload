import { createSelector } from '@ngrx/store';
import * as fromFeature from '../wordpress.reducers';
import * as fromPages from './pages.reducer';
import * as fromOptions from '../options/options.selectors';
import { getRouterState } from '../../shared';

export const getPagesState = createSelector(
	fromFeature.getWordpressState,
	(state: fromFeature.WordpressState) => state.pages
);

export const getPagesEntities = createSelector(
	getPagesState,
	fromPages.getStatePagesEntities
);

export const getAllPages = createSelector(
	getPagesEntities,
	entities => {
		return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
	}
);

export const getPage = createSelector(
	getAllPages,
	fromOptions.getOptionsState,
	getRouterState,
	(allLessons, optionsState, routerState: any) => {
		if (!routerState) {
			return {};
		}

		const isHome: boolean = (routerState.state.url === '/home' || routerState.state.url === '/');
		const slug: string = isHome ? 'home' : routerState.state.params.slug;
		const options = optionsState.options;
		const pageContent = allLessons.find((page: any) => page.slug === slug);
		if (!pageContent || pageContent === {}) {
			return {};
		}
		return {
			...pageContent,
			headerImage: pageContent.acf.header_image ? pageContent.acf.header_image : options.page_image,
			layouts: !!pageContent['acf'] && pageContent.acf.hasOwnProperty('layouts') ? JSON.parse(JSON.stringify(pageContent.acf.layouts)) : []
		}
	}
);

export const getPageBySlug = createSelector(
	getAllPages,
	fromOptions.getOptionsState,
	getRouterState,
	(allLessons, optionsState, routerState: any) => {
		if (!routerState) {
			return {};
		}
		const slug: string = routerState.state.url.replace('/', '');
		const options = optionsState.options;
		const pageContent = allLessons.find((page: any) => page.slug === slug);
		if (!pageContent || pageContent === {}) {
			return {};
		}
		return {
			...pageContent,
			headerImage: pageContent.acf.header_image ? pageContent.acf.header_image : options.page_image,
			layouts: !!pageContent['acf'] && pageContent.acf.hasOwnProperty('layouts') ? JSON.parse(JSON.stringify(pageContent.acf.layouts)) : []
		}
	}
);

export const getPagesLoaded = createSelector(
	getPagesState,
	fromPages.getStatePagesLoaded
);

export const getPagesLoading = createSelector(
	getPagesState,
	fromPages.getStatePagessLoading
);