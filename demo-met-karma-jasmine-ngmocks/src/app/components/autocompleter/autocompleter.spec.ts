import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { Autocompleter } from './autocompleter';
import { NavigateService } from '../../services/navigate.service';
import { provideZonelessChangeDetection } from '@angular/core';

interface Car {
	make: string;
	model: string;
}

describe('Component: Autocompleter', () => {
	let sut: Autocompleter<Car>;
	let fixture: ComponentFixture<Autocompleter<Car>>;
	let navigateServiceMock: jasmine.SpyObj<NavigateService>;
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

		TestBed.configureTestingModule({
			providers: [provideZonelessChangeDetection(), MockProvider(NavigateService)],
			imports: [Autocompleter],
		});

		navigateServiceMock = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
		navigateServiceMock.next.and.returnValue(4);

		fixture = TestBed.createComponent(Autocompleter<Car>);
		sut = fixture.componentInstance;
		fixture.componentRef.setInput('data', data);
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

	it(`uses the ${NavigateService.name} for nexting`, () => {
		sut.query = 'e';
		sut.autocomplete();
		sut.next();

		expect(navigateServiceMock.next).toHaveBeenCalledTimes(1);
	});

	// integratietest!
	it('renders suggestions', () => {
		sut.query = 'e';
		sut.autocomplete();
		sut.next();
		fixture.detectChanges();

		let el = fixture.nativeElement as HTMLElement;
		let listitems = el.querySelectorAll('li');
		expect(listitems.length).toBe(8);
	});
});
