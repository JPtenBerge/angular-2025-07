import { Routes } from '@angular/router';
import { Animals } from './pages/animals/animals';
import { Zooi } from './pages/zooi/zooi';
import { Reactive } from './pages/reactive/reactive';

export const routes: Routes = [
	{ path: 'animals', component: Animals },
	{ path: 'zooi/:id', component: Zooi },
	{ path: 'reactive', component: Reactive },
	{ path: '', redirectTo: '/animals', pathMatch: 'full' },
];
