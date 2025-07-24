import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Loading } from '../../components/loading/loading';
import { Animal } from '../../models/animal';
import { AnimalDal } from '../../dal/animal.dal';
import { Observable } from 'rxjs';

function mijnCustomValidator(c: AbstractControl) {
	return null;
}

@Component({
	selector: 'app-animals',
	imports: [RouterOutlet, FormsModule, ReactiveFormsModule, JsonPipe, Loading, AsyncPipe],
	templateUrl: './animals.html',
})
export class Animals {
	animals?: Animal[];
	animal$!: Observable<Animal[]>;

	isFetchingAnimals = false;
	newAnimal = {} as Omit<Animal, 'id'>;

	animalDal = inject(AnimalDal);
	cdr = inject(ChangeDetectorRef);

	addAnimalForm = new FormGroup({
		species: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.pattern('[a-zA-Z -]{3,}'), mijnCustomValidator],
		}),
		maxAge: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
		photoUrl: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
	});

	// fb = inject(NonNullableFormBuilder);
	// addAnimalForm2 = this.fb.group({
	// 	species: ['', [Validators.required, Validators.pattern('[a-zA-Z -]{3,}'), mijnCustomValidator]],
	// 	maxAge: [0, Validators.required],
	// 	photoUrl: ['', Validators.required],
	// });

	ngOnInit() {
		// this.animalDal.getAll().subscribe(animals => {
		// 	console.log('animals!', animals);
		// 	this.animals = animals;
		// 	this.isFetchingAnimals = false;
		// 	this.cdr.markForCheck();
		// });
		this.animal$ = this.animalDal.getAll();
	}

	addAnimal(form: NgForm) {
		this.animalDal.add(this.newAnimal);
		form.reset();
	}
	addAnimalReactive() {
		this.animalDal.add(this.addAnimalForm.getRawValue());
		this.addAnimalForm.reset();
	}

	increaseMaxAge(animal: Animal) {
		animal.maxAge += 5;
	}
}
