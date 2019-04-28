import { Component, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Component({
	selector: 'one-column-layout',
	templateUrl: 'one-column-layout.html',
	styleUrls: ['one-column-layout.scss'],
	host: { 'class': 'layout'}
})

export class OneColumnLayout {
	public layoutContent: any;
	@HostBinding('class.has-background') hasBackground: boolean = false;

	@Input()
	set data(value: any) {
		if (value.backgroundColor !== 'no-background') {
			this.renderer.addClass(this.element.nativeElement, `background-${value.backgroundColor}`);
			this.hasBackground = true;
		}
		this.layoutContent = {
			content: this.sanitizer.bypassSecurityTrustHtml(value.content)
		}
	}

	constructor(
		public renderer: Renderer2,
		public element: ElementRef,
		private sanitizer: DomSanitizer
	) {}
}