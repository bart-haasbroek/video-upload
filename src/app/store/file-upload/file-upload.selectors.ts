import { createSelector } from '@ngrx/store';
import * as fromFileUpload from './file-upload.reducer';

export const getUploadedFileStatus: any = createSelector(
	fromFileUpload.getFileUploadState,
	fromFileUpload.getUploadStatus
);

export const getUploadedFileProgress: any = createSelector(
	getUploadedFileStatus,
	(status: any) => {
		return status.progress;
	}
);

export const getLastUpload: any = createSelector(
	fromFileUpload.getFileUploadState,
	fromFileUpload.getStateLastUpload
);

export const fileUploadIsLoaded: any = createSelector(
	fromFileUpload.getFileUploadState,
	fromFileUpload.getFileUploadLoaded
);

export const fileUploadIsLoading: any = createSelector(
	fromFileUpload.getFileUploadState,
	fromFileUpload.getFileUploadLoading
);