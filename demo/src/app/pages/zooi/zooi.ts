import { ChangeDetectorRef, Component, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LifeComponent } from '../../components/life.component';
import { Autocompleter } from '../../components/autocompleter/autocompleter';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../models/animal';

@Component({
	selector: 'app-zooi',
	imports: [FormsModule, LifeComponent, Autocompleter],
	templateUrl: './zooi.html',
})
export class Zooi {
	showLife = false;
	animals?: Animal[];
	newAnimal = {} as Animal;

	id = input<string>();

	autocompleter = viewChild(Autocompleter<object>);

	http = inject(HttpClient);
	cdr = inject(ChangeDetectorRef);
	// route = inject(ActivatedRoute);

	ngOnInit() {
		// this.route.params.subscribe(value => console.log('route params:', value));

		console.log('id:', this.id());

		this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
			this.animals = animals;
			this.cdr.markForCheck();
		});
	}

	handleSelect(animal: Animal) {
		console.log('hey! er is iets geselecteerd bij el autocompleter:', animal);
	}
}
