import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { OneColumnLayout } from '../one-column-layout/one-column-layout';
import { TwoColumnLayout } from '../two-column-layout/two-column-layout';
import { ThreeColumnLayout } from '../three-column-layout/three-column-layout';
import { TextImageLayout } from '../text-image-layout/text-image-layout';
import { ViewChildren, QueryList, AfterViewInit, ComponentRef, ContentChild, ComponentFactoryResolver, TemplateRef, Directive, Renderer2, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContactLayout } from '../contact-layout/contact-layout';


@Component({
	selector: 'layout-component',
	templateUrl: 'layout-component.html',
})

export class LayoutComponent implements AfterViewInit {
	@ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
	@ViewChildren('dynamic', { read: ViewContainerRef }) public targets: QueryList<ViewContainerRef>;
	@Input() layouts: any = [];

	public componentMap: any = {
		oneColumnLayout: OneColumnLayout,
		twoColumnLayout: TwoColumnLayout,
		threeColumnLayout: ThreeColumnLayout,
		textImageLayout: TextImageLayout,
		contactLayout : ContactLayout,
	};

	constructor(
		public viewContainerRef: ViewContainerRef,
		public componentFactoryResolver: ComponentFactoryResolver,
		public cd: ChangeDetectorRef
	) {}

	ngAfterViewInit() {
		this.loadComponent();
		// Wait until all container refs are filled
		this.targets.changes.subscribe(t => {
			this.loadComponent();
		});
	}

	public loadComponent() {
		if (this.layouts) {
			this.layouts.forEach((layout: any, index) => {
				let component: any = this.componentMap[layout.acf_fc_layout];
				if (component) {
					let target = this.targets.toArray()[index];
					let layoutComponent = this.componentFactoryResolver.resolveComponentFactory(component);
					let componentRef: any = target.createComponent(layoutComponent);
					componentRef.instance.data = layout;
					this.cd.detectChanges();
				}
			});
		}
	}
}