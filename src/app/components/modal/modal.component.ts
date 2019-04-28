import { Component, Input, HostListener } from '@angular/core';
import { trigger, query, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'modal',
	templateUrl: 'modal.component.html',
	styleUrls: ['modal.component.scss'],
	animations: [
		trigger('fadeIn', [
			transition(':enter', [
				//begin state
				query('.modal__content', style({ opacity: 0, transform: 'translateY(20px)' })),
				query(':self, .modal__content', style({ opacity: 0 })),

				//animations
				query(':self', [
					animate('120ms ease-in', style({ opacity: 1 })),
				]),
				query('.modal__content', [
					animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
				]),

			]),
			transition(':leave', [
				//begin state
				query('.modal__content', style({ opacity: 1, transform: 'translateY(0px)' })),
				query(':self', style({ opacity: 1 })),

				//animations
				query('.modal__content', [
					animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' })),
				]),
				query(':self', [
					animate('200ms ease-in', style({ opacity: 0 })),
				]),
			]),
		]),
	],
})

export class ModalComponent {
	public isActive: boolean = false;
	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		if(event.key === 'Escape') {
			this.close();
		}
	}

	public open(): void {
		this.isActive = true;
		document.body.setAttribute('style', 'overflow: hidden');
	}

	public close(): void {
		this.isActive = false;
		document.body.removeAttribute("style");
	}
}