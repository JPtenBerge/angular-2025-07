import { Route, Routes } from '@angular/router';

export const adminRoutes: Route = {
	path: 'admin',
	// canActivate: [adminAuthGuard],
	children: [
		{ path: 'werknemers' }, // admin/werknemers
		{ path: 'producten' }, // admin/producten
	],
};
