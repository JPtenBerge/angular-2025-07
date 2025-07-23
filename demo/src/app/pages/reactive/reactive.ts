import { Component, DestroyRef, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { destroyMixin } from '../../utils/destroy-mixin';

@Component({
	selector: 'app-reactive',
	imports: [],
	templateUrl: './reactive.html',
})
export class Reactive extends destroyMixin() {
	subscription!: Subscription;

	ngOnInit() {
		let subject = new ReplaySubject<number>(2);

		let observable = subject.asObservable();

		// setTimeout(() => {
		subject.next(4);
		subject.next(8);
		subject.next(15);
		// }, 2000)

		// observable
		// 	.pipe(map(x => x * 10))
		// 	.pipe(filter(x => x > 20))
		// 	.subscribe(value => console.log('obs 2:', value));

		subject.next(16);
		subject.next(23);
		subject.next(42);

		this.subscription = observable.pipe(takeUntil(this.destroy$)).subscribe(value => console.log('obs 1:', value));
	}

	// ngOnDestroy() {
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// }
}
