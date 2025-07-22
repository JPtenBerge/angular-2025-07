import { JsonPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';

@Component({
	selector: 'app-autocompleter',
	imports: [FormsModule, JsonPipe],
	templateUrl: 'autocompleter.html',
})
export class Autocompleter<T extends object> {
	data = input.required<T[]>();
	query?: string;
	suggestions?: T[];
	activeIndex: number | null = null;
	itemSelect = output<T>();

	navigateService = inject(NavigateService);

	autocomplete() {
		if (!this.query) {
			this.suggestions = this.data();
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let prop of Object.keys(item) as (keyof typeof item)[]) {
				if (typeof item[prop] === 'string' && item[prop].toLowerCase().includes(this.query.toLowerCase())) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
		this.activeIndex = this.navigateService.next(this.suggestions!, this.activeIndex);
	}

	select() {
		let selectedAnimal = this.suggestions![this.activeIndex!];
		this.itemSelect.emit(selectedAnimal);
	}
}
