import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { Car } from '../../models/car';

@Component({
	selector: 'app-car-viewer',
	imports: [],
	templateUrl: './car-viewer.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarViewer {
	cars = input.required<Car[]>();
	cdr = inject(ChangeDetectorRef);

	ngDoCheck() {
		console.log('checking!');

		if (this.cars().length % 5 === 0) {
			this.cdr.markForCheck();
		}
	}

	getDisplayValue(car: Car) {
		car.make += 'q';
		return `${car.make} ${car.model}`;
	}

	doNothing() {}
}
