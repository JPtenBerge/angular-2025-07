import { beforeEach, describe, expect, it } from 'vitest';
import { Autocompleter } from './autocompleter';

interface Car {
	make: string;
	model: string;
}

describe('Component: Autocompleter', () => {
	let sut: Autocompleter<Car>;
	let data: Car[];

	beforeEach(() => {
		data = [
			{ make: 'Opel', model: 'Astra' },
			{ make: 'Peugeot', model: '208' },
			{ make: 'Kia', model: 'Niro' },
			{ make: 'Audi', model: 'A3' },
			{ make: 'Ferrari', model: 'Testarossa' },
			{ make: 'Mercedes', model: 'C63' },
			{ make: 'Porsche', model: '911' },
			{ make: 'Renault', model: 'Clio' },
			{ make: 'Opel', model: 'Corsa' },
			{ make: 'Renault', model: 'Megane' },
		];

		sut = new Autocompleter<Car>();
		sut.data = data;
	});

	it('autocompletes a list of suggestions', () => {
		sut.query = 't';
		sut.autocomplete();

		expect(sut.suggestions).toEqual([
			{ make: 'Opel', model: 'Astra' },
			{ make: 'Peugeot', model: '208' },
			{ make: 'Ferrari', model: 'Testarossa' },
			{ make: 'Renault', model: 'Clio' },
			{ make: 'Renault', model: 'Megane' },
		]);
	});

	it('adds suggestions uniquely', () => {
		sut.query = 'e';
		sut.autocomplete();

		expect(sut.suggestions).toEqual([
			{ make: 'Opel', model: 'Astra' },
			{ make: 'Peugeot', model: '208' },
			{ make: 'Ferrari', model: 'Testarossa' },
			{ make: 'Mercedes', model: 'C63' },
			{ make: 'Porsche', model: '911' },
			{ make: 'Renault', model: 'Clio' },
			{ make: 'Opel', model: 'Corsa' },
			{ make: 'Renault', model: 'Megane' },
		]);
	});

	it('autocompletes suggestions case-insensitively', () => {
		sut.query = 'O';
		sut.autocomplete();

		expect(sut.suggestions).toEqual([
			{ make: 'Opel', model: 'Astra' },
			{ make: 'Peugeot', model: '208' },
			{ make: 'Kia', model: 'Niro' },
			{ make: 'Ferrari', model: 'Testarossa' },
			{ make: 'Porsche', model: '911' },
			{ make: 'Renault', model: 'Clio' },
			{ make: 'Opel', model: 'Corsa' },
		]);
	});

	it('autocompletes suggestions case-insensitively', () => {
		sut.autocomplete();

		expect(sut.suggestions).toEqual(data);
	});

	describe('nexting', () => {
		beforeEach(() => {
			sut.query = 'e';
			sut.autocomplete();
		});

		it('nexts to the first suggestion when no suggestion is active', () => {
			sut.next();
			expect(sut.activeIndex).toBe(0);
		});

		it('nexts to the second suggestion when the first suggestion is active', () => {
			sut.activeIndex = 0;
			sut.next();
			expect(sut.activeIndex).toBe(1);
		});

		it('nexts to the first suggestion when the last suggestion is active', () => {
			sut.activeIndex = sut.suggestions!.length - 1;
			sut.next();
			expect(sut.activeIndex).toBe(0);
		});
	});
});
