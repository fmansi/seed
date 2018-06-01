import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { HomePage } from '../home/home.page';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  password: string = '';
  username: string = '';
  verify: string = '';
  email: string = '';

  constructor(public navCtrl: NavController,
              private authPvdr: AuthProvider, 
              private loadCtrl: LoadingController,
              private toast: ToastController) { }

  ionViewDidLoad() {
    console.log('Initiate Signup');
  }

  // TODO: form validation
  public doRegister() {
    let loader = this.loadCtrl.create({
      content: 'Signing up...'
    });
    loader.present();

    this.authPvdr.signup(this.username, this.password, this.email).subscribe((success) => {
      this.navCtrl.setRoot(HomePage);
      loader.dismissAll();
    }, (error) => {
      this.toast.create({ message: error, duration: 5000 }).present();
      loader.dismissAll();
    });
  }

}
