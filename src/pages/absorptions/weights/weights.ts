import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, Events, ToastController   } from 'ionic-angular';
//import { AbsorptionsListPage } from '../list/absorptions.list.page';
import { AbsorptionsService } from '../absorptions.service';
import { AuthProvider } from '../../../providers/auth/auth';
import { AbsorptionsConst } from '../../../app/app.constant';
import * as moment from 'moment';


@Component({
  selector: 'page-weights',
  templateUrl: 'weights.html'
})
export class WeightsPage {

  data: any;
  tests: any = [];
  controls: any = []; 
  bubbles: any = []; 
  newAbsorption: any = {};
  tempPreChiller = null;
  tempChiller = null;
  actived = false;
  now = moment();
  nowTime;
  start1;
  end1;
  start2;
  end2;
  target;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, 
              public viewCtrl: ViewController,
              public events: Events,
              public toastCtrl: ToastController,
              private authPvdr: AuthProvider,
              public service: AbsorptionsService
             ) {
    
        
    let qtyTest = JSON.parse(localStorage.getItem("settings-qtytest")) || 10;
    let testName = AbsorptionsConst.testName;   
    this.target = AbsorptionsConst.target; 
    
    moment.locale('pt-BR');

    this.nowTime = moment(this.now, ['HH:mm']);
    this.start1 = moment(AbsorptionsConst.start1, ['HH:mm']);
    this.end1 = moment( AbsorptionsConst.end1, ['HH:mm']);
    this.start2 = moment( AbsorptionsConst.start2, ['HH:mm']);
   
    console.log(this.nowTime.isAfter(this.start1) && this.nowTime.isBefore(this.end1), 'TURNO 1');
    console.log(this.nowTime.isAfter(this.start2) && this.nowTime.isAfter(this.end1), 'TURNO 2');
    
    this.events.subscribe('absorptions:permanence', (permanence) => {
      let timers: any = [];
      timers.push(permanence);
      this.newAbsorption.permanence = timers;
    })
    this.events.subscribe('absorptions:drips', (drips) => {
      let timers: any = [];
      timers.push(drips);
      this.newAbsorption.drips = timers;
    })
    this.events.subscribe('absorptions:temperatures', (temperatures) => {
      let temp: any = [];
      let bubble: any ={};
      temp.push(temperatures);
      bubble.datetime = new Date();
      bubble.status = temperatures.bubble;
      this.bubbles.push(bubble);
      this.controls = temp;
    })

    for (let i = 0; i < qtyTest; i++) {
      let id = i + 1;
      this.tests.push({ id: id, name: testName +' '+ id });  
    }
    //this.controls.push(this.tests); 
    //console.log(this.controls);  
  }

  addinitialWeight(test, index){    
    let prompt = this.alertCtrl.create({
      title: "Peso inicial",
      message: test.name,
      inputs: [
        {
          name: "iw",
          value: test.iw, 
          placeholder: "Peso inicial",
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancela',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirma',
          handler: data => { 
            this.tests[index].iw = data.iw;
          }
        }
      ]
    });
    prompt.present();
  }
   addfinalWeight(test, index){    
    let prompt = this.alertCtrl.create({
      title: "Peso final",
      message: test.name,
      inputs: [
        {
          name: "fw", 
          value: test.fw, 
          placeholder: "Peso final",
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancela',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirma',
          handler: data => { 
            this.tests[index].fw = data.fw;
          }
        }
      ]
    });
    prompt.present();
  }

  nextStep(){
    var countInitial = 0;
    var total = this.tests.length;

    for (let index = 0; index < total; index++) {
      if (this.tests[index].iw) {
        countInitial++;
      }  
    }

    if (countInitial === total) {
      this.actived = true;  
      this.newAbsorption.datetime = Date.now();
      this.events.publish('tabs:temperatures', true);
      this.navCtrl.parent.select(1);
    } 

  }

  finishWeights(){

    var total = this.tests.length;
    var countFinal = 0;
    var totalAbsortions = 0;
    for (let i = 0; i < total; i++) {
      this.tests[i].ab = (((this.tests[i].fw - this.tests[i].iw) * 100) / this.tests[i].iw).toFixed(2); 
      totalAbsortions += parseFloat(this.tests[i].ab);
      if (this.tests[i].fw) {
        countFinal++;
      }
    }

   
    if (countFinal === total) { 
      //Madia do resultados 
      var average = (totalAbsortions / total).toFixed(2);
      this.controls[0].average = average;
      this.controls[0].datetime = new Date();
      this.controls[0].tests = this.tests;
      //Criando o objeto newAbsorption
      //Define o Analista de teste logado 
      var user = this.authPvdr.currentUser();
      this.newAbsorption.analyst = user.name;
      this.newAbsorption.target =  AbsorptionsConst.target;

      this.newAbsorption.controls = this.controls;
      this.newAbsorption.bubbles = this.bubbles;
      this.newAbsorption.name =  AbsorptionsConst.docName;
      this.newAbsorption.codigo =  AbsorptionsConst.codigo;
      this.newAbsorption.revision =  AbsorptionsConst.revision;
      this.newAbsorption.date = moment().format('YYYY-MM-DD');
      this.newAbsorption.year = moment().format('YYYY');
      this.newAbsorption.month = moment().format('MMMM');
      //Define o Turno pelo horario atual
      if (this.nowTime.isAfter(this.start1) && this.nowTime.isBefore(this.end1)) {
        this.newAbsorption.shift = 'Turno I'
      } else if (this.nowTime.isAfter(this.start2) && this.nowTime.isAfter(this.end1)) {
        this.newAbsorption.shift = 'Turno II'
      } 
      //console.log(this.newAbsorption);
      this.events.publish('tests:finalized', this.newAbsorption);
    } 
    
  }
  
}
