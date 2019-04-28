import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
	selector: 'home-component',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
	public menu$: any;
	public layouts$: any;
	public fileProgress$: Observable<number>;
	public upload$: Observable<string>;
	public isUploaded$: Observable<boolean>;
	public isUploading$: Observable<boolean>;
	public pageContent$: any;

	constructor(
		private translate: TranslateService,
		private store: Store<fromStore.AppState>,
	) {
		this.translate.setDefaultLang('en');
		this.translate.use('nl');
	}

	ngOnInit() {
		this.fileProgress$ = this.store.select(fromStore.getUploadedFileProgress);
		this.upload$ = this.store.select(fromStore.getLastUpload);
		this.isUploaded$ = this.store.select(fromStore.fileUploadIsLoaded);
		this.isUploading$ = this.store.select(fromStore.fileUploadIsLoading);
	}

	public upload(event): void {
		this.store.dispatch(new fromStore.UploadFile(event))
	}
}