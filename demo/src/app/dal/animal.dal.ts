import { inject, Injectable } from '@angular/core';
import { Animal } from '../models/animal';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnimalDal {
	http = inject(HttpClient);

	getAll() {
		return this.http.get<Animal[]>('http://localhost:3000/animals');
	}

	add(newAnimal: Omit<Animal, 'id'>) {
		this.http.post('http://localhost:3000/animals', newAnimal).subscribe();
	}
}
