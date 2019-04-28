import { Action } from '@ngrx/store';

export enum FileUploadActionTypes {
	uploadFile = '[File upload] Upload a new file',
	uploadIsUploading = '[File upload] isLoading',
	updateFileStatus = '[File upload] Update the file status',
	uploadFileSuccess = '[File upload] Upload a new file success',
}

export class UploadFile implements Action {
	readonly type = FileUploadActionTypes.uploadFile;
	constructor(public payload: any) { }
}

export class UploadIsUploading implements Action {
	readonly type = FileUploadActionTypes.uploadIsUploading;
	constructor(public payload: any) { }
}

export class UpdateFileStatus implements Action {
	readonly type = FileUploadActionTypes.updateFileStatus;
	constructor(public payload: any) { }
}

export class UploadFileSuccess implements Action {
	readonly type = FileUploadActionTypes.uploadFileSuccess;
	constructor(public payload: any) { }
}

export type FileUploadActions =
	UploadFile
	| UpdateFileStatus
	| UploadIsUploading
	| UploadFileSuccess;
