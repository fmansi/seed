import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
// Providers
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
  selector: 'absorption.details.page',
  templateUrl: 'absorption.details.html',
})

export class AbsorptionDetailsPage {
  informations: any = [];
  absorptions = [];
  groups: any = [];
  bubbles: any = [];
  drips: any = [];
  permanence: any = [];
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
    this.listAbsorption();
  }

  public listAbsorption(){
    let object = this.navParams.data;
    this.informations.push(object);
    this.target = object.target;
    //console.log(object.controls);
    
    if(object.controls){
      for (let i = 0; i < object.controls.length; i++) {
        this.groups.push(object.controls[i]);
      }
    }
    if(object.bubbles){
      for (let i = 0; i < object.bubbles.length; i++) {
        this.bubbles.push(object.bubbles[i]);
      }
    }
    if(object.drips){
      for (let i = 0; i < object.drips.length; i++) {
        this.drips.push(object.drips[i]);
      }
    }
    if(object.permanence){
      for (let i = 0; i < object.permanence.length; i++) {
        this.permanence.push(object.permanence[i]);
      }
    }
    
  }

  toggleSection(i) {
   this.groups[i].open = !this.groups[i].open;
 }

 toggleItem(i, j) {
   this.groups[i].controls[j].open = !this.groups[i].controls[j].open;
 }

}
