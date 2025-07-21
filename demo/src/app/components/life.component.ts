import { Component } from '@angular/core';

@Component({
	selector: 'app-life',
	templateUrl: 'life.component.html',
})
export class LifeComponent {
    intervalId!: number;

	constructor() {
        // zo min mogelijk. DI. templateref. signals effect().
		console.log('[life] constructor!');
	}

	ngOnInit() {
        // algemeen initializatiewerk
		console.log('[life] ngOnInit');

        this.intervalId = setInterval(() => {
            console.log('interval!');
        }, 1000);
	}

	ngOnDestroy() {
        // openstaande connections opruimen.
        // - database: Indexed DB
        // - WebSocket
        // - navigator.geolocation.watchPosition()
        // - camera API
        // - Bluetooth
        // - observables .unsubscribe()
        // - intervals/(sliding) timeouts

        clearInterval(this.intervalId);
		console.log('[life] ngOnDestroy met clearinterval');
	}
}
