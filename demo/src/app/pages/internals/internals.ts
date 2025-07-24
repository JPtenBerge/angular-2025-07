import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarViewer } from '../../components/car-viewer/car-viewer';

@Component({
	selector: 'app-internals',
	imports: [CarViewer],
	templateUrl: './internals.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Internals {
	cars: Car[] = [
		{ make: 'Renault', model: 'Clio' },
		{ make: 'Opel', model: 'Corsa' },
		{ make: 'Renault', model: 'Megane' },
	];

	addCar() {
		console.log('adding car!');
		this.cars.push({ make: 'Kia', model: 'Niro' });
	}
}
