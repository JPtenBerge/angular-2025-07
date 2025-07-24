import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
	selector: 'app-signals',
	imports: [],
	templateUrl: './signals.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals {
	counter = signal(5);
	doubled = computed(() => this.counter() * 2);
	counterr = 5;

	constructor() {
		effect(() => {
			console.log('counter is nu', this.doubled());
		});
	}

	increment() {
		// this.counter.set(15);
		this.counter.update(current => current + 5);
		this.counterr = 15;
	}

}
