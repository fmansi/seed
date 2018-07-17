import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsorptionsItem } from '../models/absorptions.model';
 

@Component({
	templateUrl: 'absorptions.edit.html'
})
export class AbsorptionsEditPage {
	private viewCtrl: ViewController;
	public item: AbsorptionsItem;	

	@ViewChild('absorptionSlider') absorptionSlider: any;

	//slideOneForm: FormGroup;
	//slideTwoForm: FormGroup;

	tempPreChiller = null;
	tempChiller = null;
	timeLabel = " iniciar cronômetro";
	timePreChiller = null;
	timeChiller = null;

	controls: any = [{
		datetime: null,
		tempPreChiller: null,
		tempChiller: null,
		average: null,
		tests: null
	}];

	tests: any = [];
	bubbles: any = [{ datetime: null, status: null }];
	drips: any = [{ datetime: null, time: null }];
	permanence: any = [{ datetime: null, time: null, total: null }];
	settings: any = {
		name: 'Frango resfriado',
		start1: '04:45',
		end1: '17:00',
		start2: '17:01',
		end2: '04:44',
		qtyTest: '10'
	}

	
	showtimeChiller = false;
	submitAttempt: boolean = false;

	constructor(viewCtrl: ViewController, params: NavParams) {
		this.viewCtrl = viewCtrl;
		this.item = params.data.id ? params.data : new AbsorptionsItem();

		this.tests = [
			{ id: 1, name: this.settings.name, iw: null, fw: null  },
			{ id: 2, name: this.settings.name, iw: null, fw: null },
			{ id: 3, name: this.settings.name, iw: null, fw: null },
			{ id: 4, name: this.settings.name, iw: null, fw: null },
			{ id: 5, name: this.settings.name, iw: null, fw: null },
			{ id: 6, name: this.settings.name, iw: null, fw: null },
			{ id: 7, name: this.settings.name, iw: null, fw: null },
			{ id: 8, name: this.settings.name, iw: null, fw: null },
			{ id: 9, name: this.settings.name, iw: null, fw: null },
			{ id: 10, name: this.settings.name, iw: null, fw: null }
		];
		
	}


	next() {
		this.absorptionSlider.slideNext();
	}

	prev() {
		this.absorptionSlider.slidePrev();
	}

	close() {
		this.viewCtrl.dismiss();
	}

	save() {
		console.log(this.tests);
		for (let index = 0; index < this.tests.length; index++) {
			
			this.tests[index].ab = (((this.tests[index].fw - this.tests[index].iw) * 100) / this.tests[index].iw).toFixed(1);
			this.controls.average = ++this.tests[index].ab / this.tests.length; 
		}

 
		//this.viewCtrl.dismiss(this.tests);
		console.log(this.tests);
		console.log(this.controls.average);
	}
	

	/**
	 * time Control functions
	*/

	timeInSeconds: number;
	time: number;
	remainingTime: number;
	runTimer: boolean;
	hasStarted: boolean;
	hasFinished: boolean;
	displayTime: string;
	disabled = false;

	timersArray: any[];

	ngOnInit() {
		this.timersArray = [{
			stoppedAt: this.displayTime
		}]

		this.initTimer();
		
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
			this.showtimeChiller = true;
			this.disabled = true;
		} else if(num === 2 ){
			this.pauseTimer();
			this.timeChiller = display;
			console.log("Chiller", this.timeChiller);	
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



