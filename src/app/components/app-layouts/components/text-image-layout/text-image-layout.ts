import { Component, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'text-image-layout',
	templateUrl: 'text-image-layout.html',
	styleUrls: ['text-image-layout.scss'],
	host: { 'class': 'layout'}
})

export class TextImageLayout {
	public layoutContent: any;
	@HostBinding('class.has-background') hasBackground: boolean = false;

	@Input()
	set data(value: any) {
		if (value) {
			this.layoutContent = value;
			if (value.backgroundColor !== 'no-background') {
				this.renderer.addClass(this.element.nativeElement, `background-${value.backgroundColor}`);
				this.hasBackground = true;
			}
			this.renderer.addClass(this.element.nativeElement, `image-position-${value.imagePosition}`);
			this.renderer.addClass(this.element.nativeElement, `image-size-${value.imageSize}`);

			this.layoutContent = {
				image: value.image,
				textContent: this.sanitizer.bypassSecurityTrustHtml(value.textContent)
			}
		}
	}

	constructor(
		public renderer: Renderer2,
		public element: ElementRef,
		private sanitizer: DomSanitizer
	) { }
}