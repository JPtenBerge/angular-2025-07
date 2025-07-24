import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
	let authService = inject(AuthService);
	console.log('[authGuard]:', authService.isAuthed());
	return authService.isAuthed();
};
