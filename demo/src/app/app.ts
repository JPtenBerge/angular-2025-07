import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LifeComponent } from './components/life.component';
import { Autocompleter } from './components/autocompleter/autocompleter';
import { HttpClient } from '@angular/common/http';

interface Animal {
	id: number;
	species: string;
	maxAge: number;
	photoUrl: string;
}

@Component({
	selector: 'app-root',
	imports: [FormsModule, JsonPipe, LifeComponent, Autocompleter],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	showLife = false;
	animals?: Animal[];
	newAnimal = {} as Animal;

	autocompleter = viewChild(Autocompleter<object>);

	http = inject(HttpClient);
	cdr = inject(ChangeDetectorRef);

	ngOnInit() {
		this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
			this.animals = animals;
			this.cdr.markForCheck();
		});
	}

	addAnimal() {
		this.http.post('http://localhost:3000/animals', this.newAnimal).subscribe();
	}

	increaseMaxAge(animal: Animal) {
		animal.maxAge += 5;
	}

	handleSelect(animal: Animal) {
		console.log('hey! er is iets geselecteerd bij el autocompleter:', animal);
	}
}
