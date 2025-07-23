import { Component } from '@angular/core';
import { BehaviorSubject, filter, map, ReplaySubject, Subject } from 'rxjs';

@Component({
	selector: 'app-reactive',
	imports: [],
	templateUrl: './reactive.html',
})
export class Reactive {
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

		observable.subscribe(value => console.log('obs 1:', value));


	}
}
