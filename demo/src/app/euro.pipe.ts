import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
	transform(value: number | undefined) {
		if (value === undefined) { // alle "falsey" values: undefined null 0 false '' -0 NaN 0n
			return value;
		}

		let string = value.toString();

		if (!string.includes('.')) {
			return `€ ${string}`;
		}

		let [whole, decimals] = string.split('.');
		return `€ ${whole},${decimals?.padEnd(2, '0')}`;
	}
}
