import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
	transform(value: number) {
		let string = value.toString();

		if (!string.includes('.')) {
			return `€ ${string}`;
		}

		let [whole, decimals] = string.split('.');
		return `€ ${whole},${decimals?.padEnd(2, '0')}`;
	}
}
