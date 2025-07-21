import { beforeEach, describe, expect, it } from 'vitest';
import { EuroPipe } from './euro.pipe';

describe('Pipe: Euro', () => {
	let sut: EuroPipe;

	beforeEach(() => {
		sut = new EuroPipe(); // system under test
	});

    // let cases = [
    //     { input: 123, expected: '€ 123'},
    //     { input: 123, expected: '€ 123'},
    //     { input: 123, expected: '€ 123'},
    // ];
    // cases.forEach((data) => {
    //     it('formats a whole number as a currency', () => {
    //         let result = sut.transform(data.input);
    //         expect(result).toBe(data.expected);
    //     });
    // });

    
	it('formats a whole number as a currency', () => {
		let result = sut.transform(123);
		expect(result).toBe('€ 123');
	});

	it('formats a number with one decimal as a currency', () => {
		let result = sut.transform(123.4);
		expect(result).toBe('€ 123,40');
	});

	it('formats a number with two decimals as a currency', () => {
		let result = sut.transform(123.45);
		expect(result).toBe('€ 123,45');
	});

	it('formats a number with two decimals as a currency', () => {
		let result = sut.transform(undefined);
		expect(result).toBe(undefined); // Garbage In Garbage Out
	});
});
