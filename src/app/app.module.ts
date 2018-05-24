
import { Http, HttpModule } from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";

// Providers
import { ParseProvider } from '../providers/parse/parse';
import { AuthProvider } from '../providers/auth/auth';

// Pages
import {MyApp} from "./app.component";
import { HomeModule } from '../pages/home/home.module';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { CustomComponentsModule } from '../components/custom-components.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { AbsorptionsPageModule } from '../pages/absorptions/absorptions.module';
    
@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomeModule,
    CustomComponentsModule,
    SettingsPageModule,
    AbsorptionsPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParseProvider,
    AuthProvider
  ]
})
export class AppModule {}
