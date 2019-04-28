import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PostArchiveGuard } from './guards/postArchive.guard';
import { PostExistGuard } from './guards/post-exist.guard';

export const ROUTES: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: '../pages/home/home.module#HomeComponentModule',
		runGuardsAndResolvers: 'always',
	},
	{
		path: 'home',
		pathMatch: 'full',
		loadChildren: '../pages/home/home.module#HomeComponentModule',
		runGuardsAndResolvers: 'always',
	},
	{
		path: 'nieuws-overzicht',
		canActivate: [PostArchiveGuard],
		loadChildren: '../pages/news-overview/news-overview.module#NewsOverviewComponentModule',
	},
	{
		path: 'error',
		loadChildren: '../pages/error-page/error-page.module#ErrorPageComponentModule',
		runGuardsAndResolvers: 'always',
	},
	{
		path: ':slug',
		loadChildren: '../pages/page/page.module#PageComponentModule',
		runGuardsAndResolvers: 'always',
		//canActivate: [AuthGuard],
	},
	{
		path: 'nieuws/:id/:slug',
		loadChildren: '../pages/single/single.module#SingleComponentModule',
		runGuardsAndResolvers: 'always',
		canActivate: [PostExistGuard],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			ROUTES,
			{
				onSameUrlNavigation: 'reload',
				enableTracing: false,
			},
		),
	],
	exports: [
		RouterModule,
	],
	providers: [
		AuthGuard,
		PostArchiveGuard,
		PostExistGuard
	]
})
export class AppRoutingModule { }
