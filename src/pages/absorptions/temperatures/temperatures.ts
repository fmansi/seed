import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-temperatures',
  templateUrl: 'temperatures.html'
})
export class TemperaturesPage {
  temperatures: any = {};
  actived: boolean = false;
  bubble;

  tempPreChiller = null;
  tempChiller = null;
  
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController, 
              public navParams: NavParams,
              public events: Events) {
              this.bubble = 0;
  }
  
  finishTemps(){
    if(this.tempPreChiller != null && this.tempChiller != null){
      this.temperatures.tempPreChiller = this.tempPreChiller;
      this.temperatures.tempChiller = this.tempChiller; 
      this.temperatures.bubble = this.bubble == 0 ? 'F' : this.bubble == 1 ? 'M' : 'E';
      this.navCtrl.parent.select(2);
      this.events.publish('absorptions:temperatures', this.temperatures);
      this.events.publish('tabs:timers', true);
    }
  }

}
