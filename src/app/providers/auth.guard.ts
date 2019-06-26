import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	NavigationExtras,
	CanLoad, Route
} from '@angular/router';

import { StorageService } from './storage/storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
	isLoggedIn: any;
	redirectUrl: string;
	constructor(
		private router: Router,
		public storage: StorageService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		return this.checkLogin(url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	canLoad(route: Route): boolean {
		let url = `/${route.path}`;
		console.log('redirectUrl:', url)

		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean {
		if (this.storage.token) { return true; }

		// Store the attempted URL for redirecting
		this.storage.redirectUrl = url;

		// Create a dummy session id
		let sessionId = 123456789;

		// Set our navigation extras object
		// that contains our global query params and fragment
		let navigationExtras: NavigationExtras = {
			queryParams: { 'session_id': sessionId },
		};

		// Navigate to the login page with extras
		this.router.navigate(['/login'], navigationExtras);
		return false;
	}
}
