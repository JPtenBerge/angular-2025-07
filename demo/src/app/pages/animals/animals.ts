import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Loading } from '../../components/loading/loading';
import { Animal } from '../../models/animal';

@Component({
	selector: 'app-animals',
	imports: [RouterOutlet, FormsModule, JsonPipe, Loading],
	templateUrl: './animals.html',
})
export class Animals {
	animals?: Animal[];
	isFetchingAnimals = true;
	newAnimal = {} as Animal;

	http = inject(HttpClient);
	cdr = inject(ChangeDetectorRef);

	ngOnInit() {
		this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
			this.animals = animals;
			this.isFetchingAnimals = false;
			this.cdr.markForCheck();
		});
	}

	addAnimal() {
		this.http.post('http://localhost:3000/animals', this.newAnimal).subscribe();
	}

	increaseMaxAge(animal: Animal) {
		animal.maxAge += 5;
	}
}
