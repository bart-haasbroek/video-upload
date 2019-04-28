import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'upload-button',
	templateUrl: 'upload-button.component.html',
	styleUrls: ['upload-button.component.scss']
})

export class UploadButtonComponent {
	public errors: any = {
		maxSize: {
			code: 'maxSize',
			defaultText: 'This file is to big for uploading'
		},
		fileNotAllowed: {
			code: 'fileNotAllowed',
			defaultText: 'This file is not allowed'
		},
		maxFilesReached: {
			code: 'maxFilesReached',
			defaultText: 'You have reach the maximum amount of uploads'
		},
		alreadyUploaded: {
			code: 'alreadyUploaded',
			defaultText: 'This file is already uploaded'
		}
	};
	@Output() onError: EventEmitter<any> = new EventEmitter<any>();
	@Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
	@Output() onAddFile: EventEmitter<any> = new EventEmitter<any>();
	@Output() onRemoveFile: EventEmitter<any> = new EventEmitter<any>();
	@Output() onMaximumFilesReached: EventEmitter<any> = new EventEmitter<any>();
	@Input() acceptedFiles: string[] = ['jpg', 'jpeg', 'png', 'pdf'];
	@Input() maxMB: number = 3;
	@Input() maxFiles: number = 3;
	@Input() uploads: any[] = [];
	@Input() isUploading: boolean = false;

	public addFile(event: any): void {
		this.giveError('');
		const fileObj: File = event.target.files[0];
		const error: string = this.checkForError(fileObj);

		if (!error && fileObj) {
			this.onAddFile.emit(fileObj);
			this.onMaximumFilesReached.emit(this.hasReachMaximumFiles);
		} else {
			this.giveError(error);
		}
		const selectFileInput: any = document.querySelector('#fileSelect');
		selectFileInput.value = '';
	}

	public removeFile(file: any): void {
		this.onRemoveFile.emit(file);
		this.onMaximumFilesReached.emit(this.hasReachMaximumFiles);
	}

	public giveError(errorCode?: string): void {
		const error: string = errorCode ? this.errors[errorCode] : '';
		this.onError.emit(error);
	}

	private checkForError(file: File): string {
		if (!file) {
			return '';
		}
		let error: string = '';
		//1048576 = 1 mb
		const maxMegaBytes: number = 1048576 * this.maxMB;
		const fileType: string = this.getFileType(file);

		if (this.acceptedFiles.indexOf(fileType) === -1) {
			error = 'fileNotAllowed';
		}

		if (file.size > maxMegaBytes) {
			error = 'maxSize';
		}

		if (this.hasReachMaximumFiles) {
			error = 'maxFilesReached';
		}

		if (this.uploads.some((upload: any) => upload.name === file.name)) {
			error = 'alreadyUploaded';
		}

		return error;
	}

	get hasReachMaximumFiles(): boolean {
		return this.uploads.length === this.maxFiles;
	}

	public getShortFileName(file: File, maxCharachters: number): string {
		const fileName: string = this.getFileType(file);
		const name: string = file.name;
		let shortname: string = name;
		if (name.length > maxCharachters) {
			shortname = shortname.substring(0, maxCharachters) + `...${fileName}`;
		}
		return shortname;
	}

	private getFileType(file: File): string {
		const name: string = file.name;
		const filename: string = name.includes('.jpg') ? 'jpg' : file.type.split('/')[1];
		return filename;
	}
}