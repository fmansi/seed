import { Component } from '@angular/core';
import { NavController, ViewController, Events, ToastController } from 'ionic-angular';
import { TimersPage } from '../timers/timers';
import { TemperaturesPage } from '../temperatures/temperatures';
import { WeightsPage } from '../weights/weights';
import { AbsorptionsService } from '../absorptions.service';




@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeightsPage;
  tab2Root = TemperaturesPage;
  tab3Root = TimersPage;
  

 
  activedTemp: boolean = false;
  activedTimer: boolean = false;
  activedWeight: boolean = false;
  activedBubble: boolean = false;
  activedDrip: boolean = false;
  showSif: boolean = false;
  absorptions: any = [];


  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController, 
              private events: Events,
              public toastCtrl: ToastController,
              public service: AbsorptionsService) {
   
    this.activedWeight = true;

    this.events.subscribe('tabs:temperatures', (actived) => {
      this.activedTemp = actived;

    });
     this.events.subscribe('tabs:timers', (actived) => {
      this.activedTimer = actived;
    });
    this.events.subscribe('tabs:bubbles', (actived) => {
      this.activedBubble = actived;
    });
    this.events.subscribe('tabs:weights', (actived) => {
      this.activedWeight = actived;
    });
    this.events.subscribe('tabs:drips', (actived) => {
      this.activedDrip = actived;
    }); 
      
    this.events.subscribe('tests:finalized', eventData => {  
      if (!eventData) {
        return;
      }      
      this.closeModal(eventData);
    });    
  }


  closeModal(eventData) {
   
   /*  if (eventData) {
      this.service.addAbsorption(eventData);
      this.service.getItems('Abs');
    } */
    
    this.viewCtrl.dismiss(eventData);
  }
 
}
