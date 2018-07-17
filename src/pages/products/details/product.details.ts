import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
// Providers
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'product.details.page',
  templateUrl: 'product.details.html',
})

export class ProductDetailsPage {
  informations: any = [];
  groups: any = [];
  target;

  constructor(
              private auth: AuthProvider,
              public view: ViewController,
              private navParams: NavParams) {
              //console.log( this.navParams.data);
  }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

  dismiss(){
    this.view.dismiss();
  }

  ionViewWillLoad() {
    this.listProduct();
  }

  public listProduct(){
    let object = this.navParams.data;
    this.informations.push(object);
    this.target = object.target;
    console.log(object);
    
    if(object.items){
      for (let i = 0; i < object.items.length; i++) {
        this.groups.push(object.items[i]);
      }
    }
    
  }


}
