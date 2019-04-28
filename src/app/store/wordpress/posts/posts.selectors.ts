import { createSelector } from '@ngrx/store';
import * as fromFeature from '../wordpress.reducers';
import * as fromPosts from './posts.reducer';
import * as fromOptions from '../options/options.selectors';
import { getRouterState } from '../../shared';

export const getPostsState = createSelector(
	fromFeature.getWordpressState,
	(state: fromFeature.WordpressState) => state.posts
);

export const getPostsEntities = createSelector(
	getPostsState,
	fromPosts.getStatePostsEntities
);

export const getPostsPaginationMap = createSelector(
	getPostsState,
	fromPosts.getStatePostsPagedData
);

export const getAllPosts = createSelector(
	getPostsEntities,
	entities => {
		return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
	}
);

export const getPostsLoaded = createSelector(
	getPostsState,
	fromPosts.getStatePostsLoaded
);

export const getPostsLoading = createSelector(
	getPostsState,
	fromPosts.getStatePostsLoading
);

export const getPostsPaginationInfo = createSelector(
	getPostsState,
	getPostsPaginationMap,
	(state, paginationMap) => {
		const paginationInfo: any = {
			paginationMap: paginationMap,
			currentPage: state.currentPage,
			totalPages: state.totalPages,
			isFirstPage: state.isFirstPage,
			isLastPage: state.isLastPage
		};
		return paginationInfo;
	}
);

export const getPostsOfCurrentPage = createSelector(
	getPostsEntities,
	getPostsPaginationInfo,
	(allPosts, paginationInfo) => {
		const paginationMap: any = paginationInfo.paginationMap;
		const pageNumber: number = paginationInfo.currentPage;
		if (!paginationMap || !!!paginationMap[pageNumber]) {
			return [];
		}
		const posts: any = paginationMap[pageNumber].map((postId: number) => allPosts[postId]);
		return posts;
	}
);

export const getPostBySlug = createSelector(
	getPostsEntities,
	fromOptions.getOptionsState,
	getRouterState,
	(allPosts, optionsState, routerState: any) => {
		if (!routerState) {
			return {};
		}
		const id: string = routerState.state.params.id;
		const options = optionsState.options;
		const postContent = allPosts[id];
		if (!postContent || postContent === {}) {
			return {};
		}

		return {
			...postContent,
			headerImage: postContent.acf.header_image ? postContent.acf.header_image : options.page_image,
			layouts: !!postContent['acf'] && postContent.acf.hasOwnProperty('layouts') ? JSON.parse(JSON.stringify(postContent.acf.layouts)) : []
		}
	}
);


// getAllPages,
// 	fromOptions.getOptionsState,
// 	getRouterState,
// 	(allLessons, optionsState, routerState: any) => {
// 		if (!routerState) {
// 			return {};
// 		}
// 		const isHome: boolean = (routerState.state.url === '/home' || routerState.state.url === '/');
// 		const slug: string = isHome ? 'home' : routerState.state.params.slug;

// 		const options = optionsState.options;
// 		const pageContent = allLessons.find((page: any) => page.slug === slug);
// 		if (!pageContent || pageContent === {}) {
// 			return {};
// 		}
// 		return {
// 			...pageContent,
// 			headerImage: pageContent.acf.header_image ? pageContent.acf.header_image : options.page_image,
// 			layouts: !!pageContent['acf'] && pageContent.acf.hasOwnProperty('layouts') ? JSON.parse(JSON.stringify(pageContent.acf.layouts)) : []
// 		}
// 	}