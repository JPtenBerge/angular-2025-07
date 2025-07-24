import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
	isAuthed = signal(false);

	login() {
		this.isAuthed.set(true);
	}
	logout() {
		this.isAuthed.set(false);
	}
}
