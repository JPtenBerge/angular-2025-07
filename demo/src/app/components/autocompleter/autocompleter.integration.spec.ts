import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent, { UserEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import { Autocompleter } from './autocompleter';
import { NavigateService } from '../../services/navigate.service';

interface Car {
	make: string;
	model: string;
}

// deze tests werken (helaasch) momenteel enkel via ng test, niet via de Vitest-extensie.

describe('Component: Autocompleter', () => {
	let data: Car[];
	let user: UserEvent;
	let navigateServiceMock: Mocked<NavigateService>;

	beforeEach(async () => {
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
		navigateServiceMock = { next: vi.fn() };
		user = userEvent.setup();

		await render(Autocompleter<Car>, {
			inputs: { data },
			providers: [provideZonelessChangeDetection(), { provide: NavigateService, useValue: navigateServiceMock }],
		});
	});

	it('renders a list of suggestions', async () => {
		// Act
		const input = screen.getByRole('textbox');
		await user.type(input, 'e');
		let list = screen.getByRole('list');
		expect(list).toBeVisible();

		expect(list.children.length).toBe(8);
	});

	it('calls the navigateservice for nexting', async () => {
		// Act
		const input = screen.getByRole('textbox');
		await user.type(input, 'e');
		await user.keyboard('{ArrowDown}');

		// Assert
		let list = screen.getByRole('list');
		expect(list).toBeVisible();
		expect(list.children.length).toBe(8);
		expect(navigateServiceMock.next).toHaveBeenCalled();
	});
});
