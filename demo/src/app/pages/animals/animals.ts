import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Loading } from '../../components/loading/loading';
import { Animal } from '../../models/animal';

function mijnCustomValidator(c: AbstractControl) {
	return null;
}

@Component({
	selector: 'app-animals',
	imports: [RouterOutlet, FormsModule, ReactiveFormsModule, JsonPipe, Loading],
	templateUrl: './animals.html',
})
export class Animals {
	animals?: Animal[];
	isFetchingAnimals = true;
	newAnimal = {} as Animal;

	http = inject(HttpClient);
	cdr = inject(ChangeDetectorRef);

	addAnimalForm = new FormGroup({
		species: new FormControl<string>('', [Validators.required, Validators.pattern('[a-zA-Z -]{3,}'), mijnCustomValidator]),
		maxAge: new FormControl<number>(0, Validators.required),
		photoUrl: new FormControl<string>('', Validators.required),
	});

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
	addAnimalReactive() {
		this.http.post('http://localhost:3000/animals', this.addAnimalForm.value).subscribe();
	}

	increaseMaxAge(animal: Animal) {
		animal.maxAge += 5;
	}
}
