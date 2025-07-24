import { Routes } from '@angular/router';
import { Animals } from './pages/animals/animals';
import { Zooi } from './pages/zooi/zooi';
import { Reactive } from './pages/reactive/reactive';
import { Internals } from './pages/internals/internals';
import { Signals } from './pages/signals/signals';

export const routes: Routes = [
	{ path: 'animals', component: Animals },
	{ path: 'zooi/:id', component: Zooi },
	{ path: 'reactive', component: Reactive },
	{ path: 'internals', component: Internals },
	{ path: 'signals', component: Signals },
	{ path: '', redirectTo: '/animals', pathMatch: 'full' },
];
