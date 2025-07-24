import { Routes } from '@angular/router';
import { Animals } from './pages/animals/animals';
import { Zooi } from './pages/zooi/zooi';
import { Reactive } from './pages/reactive/reactive';
import { Internals } from './pages/internals/internals';
import { Signals } from './pages/signals/signals';
import { authGuard } from './guards/auth-guard';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
	{ path: 'animals', component: Animals },
	{ path: 'zooi/:id', component: Zooi },
	{ path: 'reactive', loadComponent: () => import('./pages/reactive/reactive').then(x => x.Reactive) },
	{ path: 'internals', component: Internals, canActivate: [authGuard] },
	{ path: 'signals', component: Signals },
	adminRoutes,
	{ path: '', redirectTo: '/animals', pathMatch: 'full' },
];
