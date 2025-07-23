import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({ selector: '[fancy]' })
export class FancyDirective {
	element = inject(ElementRef);
    fancy = input<string>();

	// DOM API  document.querySelector()

	@HostListener('mouseenter')
	mouseover() {
		let el = this.element.nativeElement as HTMLElement;
		el.style.background = this.fancy() ? this.fancy()! : 'purple';
	}

	@HostListener('mouseleave')
	mouseleave() {
		let el = this.element.nativeElement as HTMLElement;
		el.style.background = '';
	}
}
