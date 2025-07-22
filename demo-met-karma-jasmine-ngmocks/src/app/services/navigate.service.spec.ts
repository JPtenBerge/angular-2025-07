import { NavigateService } from './navigate.service';

describe(`Service: ${NavigateService.name}`, () => {
	let sut: NavigateService;

	beforeEach(() => {
		sut = new NavigateService();
	});

	it('nexts to the first suggestion when no suggestion is active', () => {
		let result = sut.next([1, 2, 3], null);
		expect(result).toBe(0);
	});

	it('nexts to the second suggestion when the first suggestion is active', () => {
		let result = sut.next([1, 2, 3], 0);
		expect(result).toBe(1);
	});

	it('nexts to the first suggestion when the last suggestion is active', () => {
		let result = sut.next([1, 2, 3], 2);
		expect(result).toBe(0);
	});
});
