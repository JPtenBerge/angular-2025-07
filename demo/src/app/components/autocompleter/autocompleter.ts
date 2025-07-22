import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-autocompleter',
	imports: [FormsModule, JsonPipe],
	templateUrl: './autocompleter.html',
})
export class Autocompleter<T extends object> {
	data = input.required<T[]>();
	query?: string;
	suggestions?: T[];
	activeIndex: number | null = null;
	itemSelect = output<T>();

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
		if (this.activeIndex !== null) {
			// module sets index to the first item. nice!
			this.activeIndex = (this.activeIndex + 1) % this.suggestions!.length;
			return;
		}

		this.activeIndex = 0;
	}

	select() {
		let selectedAnimal = this.suggestions![this.activeIndex!];
		this.itemSelect.emit(selectedAnimal);
	}
}
