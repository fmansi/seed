import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

import { Tile } from './models/tile.model';
import { EmailService } from '../../services/email.service';
import { CallService } from '../../services/call.service';
import { MapsService } from '../../services/maps.service';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';


@Component({
	templateUrl: 'home.html'
})
export class HomePage {
	public tiles: Tile[][];

	private emailService: EmailService;
	private callService: CallService;
	private mapsService: MapsService;
	private browserService: InAppBrowserService;
	private nav: Nav;

	constructor(
		emailService: EmailService,
		callService: CallService,
		mapsService: MapsService,
		browserService: InAppBrowserService,
		private auth: AuthProvider,
		nav: Nav
	) {
		this.emailService = emailService;
		this.callService = callService;
		this.mapsService = mapsService;
		this.browserService = browserService;
		this.nav = nav;
		//this.initTiles();
	}

	ionViewCanEnter(): boolean {
		return this.auth.authenticated();
	}

	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
	}

	public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {
		this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}

	/* private initTiles(): void {
		this.tiles = [[{
			title: 'Controle de Absorção',
			path: 'absorptions-list',
			icon: 'thermometer',
			component: AbsorptionsListPage
		}]];
	} */
}
