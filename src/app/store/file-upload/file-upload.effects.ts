import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FileUploadActionTypes, UpdateFileStatus, UploadFileSuccess, } from './file-upload.actions';
import { withLatestFrom, switchMap, map, finalize, take, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromFileUpload from '../../store/file-upload/file-upload.reducer';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Store } from '@ngrx/store';

@Injectable()
export class FileUploadEffects {
	public ref: AngularFireStorageReference;
	public task: AngularFireUploadTask;

	constructor(
		private actions$: Actions,
		private afStorage: AngularFireStorage,
		private store: Store<fromFileUpload.FileUploadState>,
	) { }

	@Effect()
	uploadFile$: any = this.actions$.ofType(FileUploadActionTypes.uploadFile)
		.pipe(
			switchMap((action: any) => {
				const file: any = action.payload;
				const id = Math.random().toString(36).substring(2);
				const ref: AngularFireStorageReference = this.afStorage.ref(id);
				const task: AngularFireUploadTask = ref.put(file);
				return task.snapshotChanges().pipe(
					withLatestFrom(
						task.percentageChanges()
					),
					finalize(() => {
						ref.getDownloadURL().subscribe((url: string) => {
							this.store.dispatch(new UploadFileSuccess(url))
						})
					}),
					map((update) => {
						const progress: any = Math.round(update[1]);
						return new UpdateFileStatus(progress);
					})
				)
			})
		);
}
