import { Routes } from '@angular/router';
import { Animals } from './pages/animals/animals';
import { Zooi } from './pages/zooi/zooi';

export const routes: Routes = [
	{ path: 'animals', component: Animals },
	{ path: 'zooi/:id', component: Zooi },
	{ path: '', redirectTo: '/animals', pathMatch: 'full' },
];
