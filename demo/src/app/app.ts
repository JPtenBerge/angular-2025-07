import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './euro.pipe';

interface Animal {
	id: number;
	species: string;
	maxAge: number;
	photoUrl: string;
}

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CurrencyPipe, LowerCasePipe, UpperCasePipe, EuroPipe],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	name = 'JP';

	price = 12345678.90;

	animals: Animal[] = [
		{
			id: 4,
			species: 'Cat',
			maxAge: 18,
			photoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F2111331.jpg&f=1&ipt=5f9d5319f73bfdd87ddebf52bf88bb6533c031a74b51ba43303bd5a149cc3892',
		},
		{
			id: 8,
			species: 'Dog',
			maxAge: 20,
			photoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2018%2F10%2F06%2F364377-puppies-puppy-baby-dog-dogs-41.jpg&f=1&nofb=1&ipt=672823a750bbd3e16f68e2bf4d17d42b82890441794ecbdda3c9465c7ac45ef4',
		},
		{
			id: 15,
			species: 'Parrot',
			maxAge: 120,
			photoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fanimalia-life.club%2Fdata_images%2Fparrot%2Fparrot4.jpg&f=1&nofb=1&ipt=08373a91ce5d5a56ada1f3b0df8af9ab0a19eb8416e4e5eba50c17898a21523c',
		},
	];

	changeName() {
		this.name += ' Daniel';
	}

	increaseMaxAge(animal: Animal) {
		animal.maxAge += 5;
	}
}
