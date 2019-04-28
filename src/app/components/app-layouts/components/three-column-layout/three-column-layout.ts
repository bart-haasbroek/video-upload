import { Component, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'three-column-layout',
	templateUrl: 'three-column-layout.html',
	styleUrls: ['./three-column-layout.scss'],
	host: { 'class': 'layout'}
})

export class ThreeColumnLayout {
	public layoutContent: any;
	@HostBinding('class.has-background') hasBackground: boolean = false;

	@Input()
	set data(value: any) {
		if (value.backgroundColor !== 'no-background') {
			this.renderer.addClass(this.element.nativeElement, `background-${value.backgroundColor}`);
			this.hasBackground = true;
		}
		this.layoutContent = {
			contentLeft: this.sanitizer.bypassSecurityTrustHtml(value.contentLeft),
			contentCenter: this.sanitizer.bypassSecurityTrustHtml(value.contentCenter),
			contentRight: this.sanitizer.bypassSecurityTrustHtml(value.contentRight),
		};
	}

	constructor(
		public renderer: Renderer2,
		public element: ElementRef,
		private sanitizer: DomSanitizer
	) {}
}