import { Action, createFeatureSelector } from '@ngrx/store';
import { FileUploadActions, FileUploadActionTypes } from './file-upload.actions';
import { strictEqual } from 'assert';

export interface FileUploadState {
	lastUpload: any;
	status: {
		progress: number,
		state: string
	};
	uploads: any[];
	loading: boolean;
	loaded: boolean;
	error: string;
}

const initialState: FileUploadState = {
	lastUpload: undefined,
	status: {
		progress: 0,
		state: ''
	},
	uploads: [],
	loading: false,
	loaded: false,
	error: ''
};

export function fileUploadReducer(state: FileUploadState = initialState, action: FileUploadActions): FileUploadState {
	switch (action.type) {
		case FileUploadActionTypes.uploadFile: {
			return {
				...state,
				loading: true,
				loaded: false
			};
		}

		case FileUploadActionTypes.updateFileStatus: {
			const progress: number = action.payload;
			return {
				...state,
				status: {
					state: 'uploading',
					progress: progress
				}
			};
		}

		case FileUploadActionTypes.uploadFileSuccess: {
			const lastUpload: string = action.payload;
			const uploads: string[] = [
				...state.uploads,
				lastUpload
			];
			return {
				...state,
				lastUpload,
				uploads,
				loading: false,
				loaded: true,
				status: {
					state: 'uploaded',
					progress: 100
				},
			};
		}
		default:
			return state;
	}
}

export const getFileUploadState: any = createFeatureSelector<FileUploadState>('file-upload');
export const getUploadStatus: any = (state: any) => state.status;
export const getStateLastUpload: any = (state: any) => state.lastUpload;
export const getFileUploadLoaded: any = (state: any) => state.loaded;
export const getFileUploadLoading: any = (state: any) => state.loading;
