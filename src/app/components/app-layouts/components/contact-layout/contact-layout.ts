import { Component, Input, Renderer2, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from '../../../../services/general.service';

@Component({
	selector: 'contact-layout',
	templateUrl: 'contact-layout.html',
	styleUrls: ['contact-layout.scss'],
	host: { 'class': 'layout'}
})

export class ContactLayout {
	public layoutContent: any;
	public contactForm: any = this.fb.group({
		name: ['Bart', Validators.required],
		email: ['test123@test.com', [Validators.email, Validators.required]],
		telephone: [''],
		subject: [''],
		message: ['Dit is een testbericht', Validators.required]
	})
	@Output() onSend: EventEmitter<any> = new EventEmitter<any>();
	@HostBinding('class.has-background') hasBackground: boolean = false;

	@Input()
	set data(value: any) {
		if (value.backgroundColor !== 'no-background') {
			this.renderer.addClass(this.element.nativeElement, `background-${value.backgroundColor}`);
			this.hasBackground = true;
		}
		this.layoutContent = value;
	}

	constructor(
		public renderer: Renderer2,
		public element: ElementRef,
		public fb: FormBuilder,
		public generalService: GeneralService,
	) {}

	public sendForm(): void {
		if (this.contactForm.valid) {
			this.onSend.emit(this.contactForm.value);
			this.generalService.sendMail(this.contactForm.value).subscribe();
		} else {
			this.validateAllFormFields(this.contactForm);
		}
	}

	public required(name: string): boolean {
		return (
			this.contactForm.get(name).hasError('required') &&
			this.contactForm.get(name).touched
		)
	}

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
		const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}
}