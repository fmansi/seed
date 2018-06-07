import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  registerPage = SignupPage;
  password: string = '';
  username: string = '';

  constructor(public navCtrl: NavController,
    private loadCtrl: LoadingController,
    private authPvdr: AuthProvider,
    private toast: ToastController) { }

  ionViewDidLoad() {
    console.log('Initiated Signin');
    // Automatic Login
    let user = this.authPvdr.authenticated();
    if (user){
      this.navCtrl.setRoot(HomePage);
    }
  }

  public doSignin() {
    let loader = this.loadCtrl.create({
      content: 'Verificando credenciais...'
    });
    loader.present();

    this.authPvdr.signin(this.username, this.password).subscribe((success) => {
      this.navCtrl.setRoot(HomePage);
      loader.dismissAll();
    }, (error) => {
      this.toast.create({ message: error, duration: 5000 }).present();
      loader.dismissAll();
    });
  }

}
