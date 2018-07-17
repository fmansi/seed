import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Config } from '../../config';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  private parseServerUrl: string;
  private parseServerDB: string;
 // private key = 'settings-key';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth: AuthProvider) {
    this.parseServerUrl = Config.parseApi.parseServerUrl;
    this.parseServerDB = Config.parseApi.absorptionDB;
  }
 
  //Set Defaults 
  qtytest = JSON.parse(localStorage.getItem("settings-qtytest")) || 10;
  notifications = JSON.parse(localStorage.getItem("settings-notifications")) || "mute";
  icon: string =  "notifications-off";
  isToggled = localStorage.getItem("settings-SIF") || false;

  ionViewDidLoad() {
    /* console.log('ionViewDidLoad SettingsPage');
    console.log(localStorage.getItem("settings-qtytest"));
    console.log(localStorage.getItem("settings-SIF"));
    console.log(localStorage.getItem("settings-notifications")); */
  }
  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }
  
  qtytests(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  
  qtyChosen(): void {
    console.log(this.qtytest);
    this.saveLocalData('settings-qtytest', this.qtytest);
  }
  public notify() {
    console.log("Toggled: " + this.isToggled);
    this.saveLocalData('settings-SIF', this.isToggled);
  }
 
  public notificationSelect(selected) {
    console.log("Event: " + selected);
    if(selected == "enable"){
      this.icon = "notifications";
    }else{
      this.icon = "notifications-off";
    }
    this.saveLocalData('settings-notifications', selected);
  }
  
  public saveLocalData(key, data){
    localStorage.setItem(key, JSON.stringify(data));
  }
 
}
