import { Component, ViewChild } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Initial page
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home.page';
import { AuthProvider } from '../providers/auth/auth';
import { SettingsPage } from '../pages/settings/settings';
import { AbsorptionsListPage } from '../pages/absorptions/list/absorptions.list.page';
import { ProductsListPage } from '../pages/products/list/products.list.page';
import { MonitoringPage } from "../pages/monitoring/monitoring";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  wide: boolean = false;
  qualityPages;
  homePage;
  rootPage: any = SigninPage;

  private app;
  private platform;
  private menu: MenuController;
  
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
              menu: MenuController,
              app: App,
              private statusBar: StatusBar,
              private auth: AuthProvider,
              splashScreen: SplashScreen) {
    
    this.menu = menu;
    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    

    // set our app's pages
    this.homePage = { title: 'Home', component: HomePage, icon: 'home' };

    this.qualityPages = [
      { title: 'Absorção (Chiller)', component: AbsorptionsListPage, icon: 'thermometer' },
      { title: 'Avaliação de Produto', component: ProductsListPage, icon: 'cube' },
      { title: 'Monitoramento Temperatura', component: MonitoringPage, icon: 'eye' }
    ];
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let component = page.component;
    /* if (component === OAuthProvidersListPage && this.oauthService.isAuthorized()) {
      component = OAuthProfilePage;
    } */

    this.nav.setRoot(component);
  }

  settings(){
    this.menu.close();
    this.nav.setRoot(SettingsPage);
  }

  signout() {
    this.auth.signout().subscribe(() => {
      this.menu.close();
      this.nav.setRoot(SigninPage);
    });
  }
}

