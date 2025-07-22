import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigateService {
	next<T>(data: T[], activeIndex: number | null) {
		if (activeIndex !== null) {
			// modulo sets index to the first item. nice!
			return (activeIndex + 1) % data.length;
		}

		return 0;
	}
}
