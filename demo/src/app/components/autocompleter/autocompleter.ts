import { JsonPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-autocompleter',
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: 'autocompleter.html',
})
export class Autocompleter<T extends object> {
	data = input.required<T[]>();
	query = new FormControl<string>('');
	suggestions?: T[];
	activeIndex: number | null = null;
	itemSelect = output<T>();

	navigateService = inject(NavigateService);

	ngOnInit() {
		this.query.valueChanges
			.pipe(debounceTime(300))
			.pipe(distinctUntilChanged())
			.subscribe(_ => this.autocomplete());
	}

	autocomplete() {
		console.log('autocompleting!', this.query.value);
		if (!this.query) {
			this.suggestions = this.data();
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let prop of Object.keys(item) as (keyof typeof item)[]) {
				if (
					typeof item[prop] === 'string' &&
					item[prop].toLowerCase().includes(this.query.value!.toLowerCase())
				) {
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
