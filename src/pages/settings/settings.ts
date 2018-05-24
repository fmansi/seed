import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //Set Defaults 
  qtytest: number = 10;
  notifications: string = "mute";
  icon: string = "notifications-off";
  isToggled = true;

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  
  qtytests(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  
  qtyChosen(): void {
    console.log(this.qtytest);
  }
  public notify() {
    console.log("Toggled: " + this.isToggled);
  }
 
  public notificationSelect(selected) {
    console.log("Event: " + selected);
    if(selected == "enable"){
      this.icon = "notifications";
    }else{
      this.icon = "notifications-off";
    }
  }
 
 
}
