import { Subject } from 'rxjs';

// alternatief: blijkbaar is er nu ook een DestroyRef die je kan laten injecteren

export const destroyMixin = () => {
	return class {
		destroy$ = new Subject<void>();

		ngOnDestroy() {
			console.log('alle susbcribers killen');
			this.destroy$.next();
		}
	};
};
