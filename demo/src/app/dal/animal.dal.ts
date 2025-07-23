import { inject, Injectable } from '@angular/core';
import { Animal } from '../models/animal';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimalDal {
	#http = inject(HttpClient);
	#subject = new BehaviorSubject<Animal[]>([]);

	getAll() {
		this.#http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
			this.#subject.next(animals);
		});

		return this.#subject.asObservable();
	}

	add(newAnimal: Omit<Animal, 'id'>) {
		this.#http.post<Animal>('http://localhost:3000/animals', newAnimal).subscribe(updatedAnimal => {
			this.#subject.next([...this.#subject.value, updatedAnimal]);
		});
	}
}
