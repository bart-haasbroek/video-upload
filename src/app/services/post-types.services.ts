import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiGateway } from './api/api-gateway';
import { Settings } from './api/settings'

@Injectable()
export class PostTypeService {

	constructor(
		private apiGateway: ApiGateway,
	) {
	}


	// Pages
	public getPages(): Observable<any> {
		return this.apiGateway.get(`${Settings.pageEndpoint}`);
	}

	public getPageBySlug(slug: string): Observable<any> {
		return this.apiGateway.get(`${Settings.pageEndpoint}?slug=${slug}`);
	}

	public getPageById(id: number): Observable<any> {
		return this.apiGateway.get(`${Settings.pageEndpoint}${id}`);
	}


	// Post types
	public getPostTypeList(postType: string): Observable<any> {
		return this.apiGateway.get(`${Settings.postTypeEndpoint}${postType}`);
	}

	// Posts
	public getPosts(): Observable<any> {
		return this.apiGateway.get(`${Settings.postEndpoint}`);
	}

	public getPostsOfPage(pageNumber: number): Observable<any> {
		const postsPerPage: number = 5;
		//pageNumber = pageNumber || 1;
		return this.apiGateway.get(`${Settings.postEndpoint}?per_page=${postsPerPage}&page=${pageNumber}`, false, false, {getResponseHeader: true});
	}


	// OUD
	// public getNewPosts(): Observable<any> {
	// 	let offset: number = this.store.value.posts ? this.store.value.posts.offset : 0;
	// 	let currentPosts: any = this.store.value.posts.posts;
	// 	return this.apiGateway.get(`${Settings.postEndpoint}?offset=${offset}`)
	// 	.map((posts: any) => {
	// 		// Filter all the post which are double
	// 		return posts.filter((post: any) => !!!currentPosts.find((currentPost: any) => currentPost.id === post.id ))
	// 	})
	// 	.do((next: any) => {
	// 		this.store.set('posts', {
	// 			posts: [...this.store.value.posts.posts, ...next],
	// 			offset: offset++,
	// 		});
	// 	});
	// }

	// public fetchPageBySlug(slug: string): Observable<any> {
	// 	return this.apiGateway.get(`${Settings.pageEndpoint}?slug=${slug}`)
	// 	.filter(Boolean)
	// 	.map((page: any) => !!page.length);
	// }


	// public getPageBySlug2(slug: string): Observable<any> {
	// 	return this.store.select('pages')
	// 	.filter(Boolean)
	// 	.switchMap((pages: any) => {
	// 		let page: any = pages.find((page) => page.slug === slug);
	// 		if (page) {
	// 			return Observable.of(page);
	// 		} else {
	// 			return this.fetchPageBySlug(slug);
	// 		}
	// 	});
	// }
}
