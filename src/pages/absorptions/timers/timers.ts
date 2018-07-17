import { Component } from '@angular/core';
import { NavController, Events} from 'ionic-angular';
//import { AbsorptionsConst } from '../../../app/app.constant';
import * as moment from 'moment';

@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html'
})
export class TimersPage {
  actived : boolean;
  permanence: any = {};
  drips: any = {};
  now = moment();
  nowTime;
  isSIF = JSON.parse(localStorage.getItem("settings-SIF")) || false;
  startTime = new Date();



  constructor(public navCtrl: NavController,
              public events: Events) {

	  moment.locale('pt-BR');
	  this.nowTime = moment(this.now, ['HH:mm']);
  }


 	/**
	* time Control functions
	*/

	timePreChiller = null;
	timeChiller = null;
	timeDrip = null;
	
	timeInSeconds: number;
	time: number;
	remainingTime: number;
	runTimer: boolean;
	hasStarted: boolean;
	hasFinished: boolean;
	displayTime: string;

	disabled: boolean = false;
	timersArray: any[];

	ngOnInit() {
		this.timersArray = [{
			stoppedAt: this.displayTime
		}]

		this.initTimer();
		
	}

	handler = this.setNext;
	text = 'iniciar cronômetro';
	icon = 'play';

	setNext() {
		this.handler = this.goToNext;
		this.text = 'registrar tempo';
		this.icon = 'pause';
		this.startTimer();
		this.permanence.datetime = this.startTime;
	}


	goToNext() {
/* 		this.text = 'reiniciar cronômetro';
		this.icon = 'refresh';
		this.handler = this.goToRestart; */
		this.timersArray.push({ stoppedAt: this.displayTime });
		this.goToRestart();
		if(this.timersArray.length == 2 ){
			this.timePreChiller = this.timersArray[1].stoppedAt;
			this.permanence.timePreChiller = this.timePreChiller;
		}
		if (this.timersArray.length == 3) {
			this.timeChiller = this.timersArray[2].stoppedAt;
			this.permanence.timeChiller = this.timeChiller;
			let durations = [];
			durations.push(this.timePreChiller);
			durations.push(this.timeChiller);
			const totalDurations = durations.slice(1)
				.reduce((prev, cur) => moment.duration(cur).add(prev),
					moment.duration(durations[0]))
			//console.log(`Total time is: ${moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss")}`)		
			this.permanence.timeTotal = moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss");
			console.log(this.permanence.timeTotal);
			if(!this.isSIF){
				this.handler = this.goToFinish;
				this.text = 'Finalizar tempos';
				this.icon = 'square';
			}
		}
		if (this.timersArray.length == 4 && this.isSIF) {
			this.timeDrip = this.timersArray[3].stoppedAt;
			this.drips.datetime = this.startTime;
			this.drips.time = this.timeDrip;
			this.events.publish('absorptions:drips', this.drips);
			this.handler = this.goToFinish;
			this.text = 'Finalizar tempos';
			this.icon = 'square';
		}
		
	}

	goToRestart(){
	
		this.text = 'iniciar cronômetro';
		this.icon = 'play';
		this.handler = this.setNext;
		this.initTimer();
	
	}

	goToFinish() {
		this.text = 'Finalizado';
		this.disabled = true;
		this.icon = 'square';
		this.navCtrl.parent.select(0);
		this.events.publish('absorptions:permanence', this.permanence);		
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
