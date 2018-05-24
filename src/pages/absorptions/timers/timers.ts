import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AbsorptionsConst } from '../../../app/app.constant';
import * as moment from 'moment';

@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html'
})
export class TimersPage {
  actived : boolean;
  permanence: any = {};
  now = moment();
  nowTime;
  isSIF = JSON.parse(localStorage.getItem("settings-SIF")) || false;



  constructor(public navCtrl: NavController,
              public events: Events) {

	  moment.locale('pt-BR');
	  this.nowTime = moment(this.now, ['HH:mm']);
  }


 	/**
	* time Control functions
	*/

	timeLabel = " iniciar cronômetro";
	timePreChiller = null;
	timeChiller = null;
	timeDrip = null;
	showtimeChiller = false;

	timeInSeconds: number;
	time: number;
	remainingTime: number;
	runTimer: boolean;
	hasStarted: boolean;
	hasFinished: boolean;
	displayTime: string;
	timePreChillerDisabled = false;
	timeChillerDisabled = false;
	timeDripDisabled = false;

	timersArray: any[];

	ngOnInit() {
		this.timersArray = [{
			stoppedAt: this.displayTime
		}]

		this.initTimer();
		
	}

	handler = this.setNext;
	text = 'first text';

	setNext() {
		alert('handler1 called');
		this.handler = this.goToNext;
		this.text = 'other text';
	}

	goToNext() {
		alert('second called');
		// go to Next Page
	}

	initTimer() {
		
		if (!this.timeInSeconds) { this.timeInSeconds = 0; }

		this.time = this.timeInSeconds;
		this.runTimer = false;
		this.hasStarted = false;
		this.hasFinished = false;
		this.remainingTime = this.timeInSeconds;

		this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
	}

	createNew() {
		this.timersArray.push({ stoppedAt: this.displayTime });

		this.initTimer();
		this.pauseTimer();
	}

	startTimer() {
		this.runTimer = true;
		this.hasStarted = true;
		this.timerTick();
		this.timeLabel = "Tempo Pré-Chiller";	
	}

	getTimer(display ,num){
		
		if(num === 1){
			this.timePreChiller = display;
			console.log("Pré-Chiller", this.timePreChiller);
			var startTime = new Date();
			this.permanence.datetime = startTime;
			this.permanence.timePreChiller = this.timePreChiller;
			this.showtimeChiller = true;
			this.timePreChillerDisabled = true;
		} else if(num === 2 ){
			this.pauseTimer();
			this.permanence.timeTotal = new Date();	
			this.timeChiller = display;
			console.log("Chiller", this.timeChiller);
			this.permanence.timeChiller = this.timeChiller;
			this.timeChillerDisabled = true;	
			if(!this.isSIF){
				this.navCtrl.parent.select(0);
				this.events.publish('absorptions:permanence', this.permanence); 
			}else{
				this.initTimer();
			}			
		} else if (num === 3) {
			this.startTimer();
			console.log("Gotejamento", this.timeDrip);
			this.permanence.timeDrip = this.timeDrip;
			this.timeDripDisabled = true;	
		}
	
	}

	pauseTimer() {
		this.runTimer = false;
		return true;				
	}

	resumeTimer() {
		this.startTimer();		
	}

	timerTick() {
		setTimeout(() => {

			if (!this.runTimer) { return; }
			this.remainingTime++;
			this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
			if (this.remainingTime > 0) {
				this.timerTick();
			}
			else {
				this.hasFinished = true;
			}
		}, 1000);
	}

	getSecondsAsDigitalClock(inputSeconds: number) {
		var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		var hoursString = '';
		var minutesString = '';
		var secondsString = '';
		hoursString = (hours < 10) ? "0" + hours : hours.toString();
		minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
		secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
		return hoursString + ':' + minutesString + ':' + secondsString;
	}
}
