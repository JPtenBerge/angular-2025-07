import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LifeComponent } from '../../components/life.component';
import { Autocompleter } from '../../components/autocompleter/autocompleter';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../models/animal';
import { FancyDirective } from '../../directives/fancy.directive';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-zooi',
	imports: [FormsModule, LifeComponent, Autocompleter, FancyDirective],
	templateUrl: './zooi.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Zooi {
	name = 'JP';

	changeName() {
		this.name = 'Daniel';
	}

	showLife = false;
	animals?: Animal[];
	newAnimal = {} as Animal;

	id = input<string>();

	autocompleter = viewChild(Autocompleter<object>);

	http = inject(HttpClient);
	cdr = inject(ChangeDetectorRef);
	authService = inject(AuthService);
	route = inject(ActivatedRoute);
	router = inject(Router);


	// route = inject(ActivatedRoute);

	ngOnInit() {
		// this.route.params.subscribe(value => console.log('route params:', value));

		console.log('id:', this.id());

		this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
			this.animals = animals;
			this.cdr.markForCheck();
		});

		// this.router.navigate(['/animals']);
	}

	handleSelect(animal: Animal) {
		console.log('hey! er is iets geselecteerd bij el autocompleter:', animal);
	}
}
