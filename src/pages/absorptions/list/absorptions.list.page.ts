import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { AngularBillboardService } from 'angular-billboard';

import { AbsorptionsService } from '../absorptions.service';
import { AbsorptionsItem } from '../models/absorptions.model';
import { AbsorptionsEditPage } from '../edit/absorptions.edit.page';
import { AbsorptionDetailsPage } from '../details/absorption.details';
// Providers
import { AuthProvider } from '../../../providers/auth/auth';

import { TabsPage } from '../tabs/tabs'; 

@Component({
	templateUrl: 'absorptions.list.html',
	providers: [AbsorptionsService]
})
export class AbsorptionsListPage implements OnInit {
	private service: AbsorptionsService;
	private modalController: ModalController;

	absorptions = [];
	groups: any = [];

	type = 'bar';
	chart: any;
	chartsOptions: any[];
	showchart:boolean = false; 
	first: any = [];
	secondy: any = [];

	constructor(service: AbsorptionsService, 
				modalController: ModalController,
				public navCtrl: NavController,
				private auth: AuthProvider,
				public alertCtrl: AlertController,
				private angularBillboardService: AngularBillboardService) {
		this.service = service;
		this.modalController = modalController;

		
	}

	ngOnInit(): void {
		this.loadItems();
	}

	ionViewCanEnter(): boolean {
		return this.auth.authenticated();
	}
	
	
	
	private loadItems(){
		let offset = this.absorptions.length;
		let limit = 20;		
		return this.service.getItems( offset, limit).then(results => {
			if (results === '') return [];
			for (let index = 0; index < results.length; index++) {
				const element = results[index];
				if (element.attributes.shift === "Turno I") {
					this.first.push(parseFloat(element.attributes.controls[0].average));
				}
				if (element.attributes.shift === "Turno II") {
					this.secondy.push(parseFloat(element.attributes.controls[0].average));
				}
			}
			results.forEach(item => {
				this.absorptions.push(item.attributes);
			});
			return this.absorptions;
		});
		/* this.absorptions.push(this.service.getItems());
		console.log(this.absorptions); */
		
	} 

	itemSelected(informations: any) {
		this.navCtrl.push(AbsorptionDetailsPage, informations);
	}

	 addAbsorption() {

	   let modal = this.modalController.create(TabsPage);
		modal.onDidDismiss(item => {
			if (!item) {
				return;
			}
			//console.log(item);	
			this.service.addAbsorption(item);
			this.absorptions.push(item);
		});
		modal.present();
	}

	deleteAbsorption(absorption){			
		let confirm = this.alertCtrl.create({
			title: 'Controle de Absorção',
			message: 'Deseja realmente remover este registro?',
			buttons: [
				{
					text: 'Não',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Sim',
					handler: () => {
						this.service.deleteAbsortion(absorption);
					}
				}
			]
		});
		confirm.present();
	}
	getChartData(){
		
		let data: any ={};
		let columns: any =[[],[]];

		// Show data last result 
		columns[0] = this.first.reverse();
		columns[1] = this.secondy.reverse();
		// Insert first labels
		columns[0].unshift('Turno I');
		columns[1].unshift('Turno II');
		
		data.type = this.type;
		data.columns= columns;

		console.log(data);
		return data;
		
	}

	showChart(){
		this.chartsOptions = [
			{
				data: this.getChartData(),
				grid: {
					y: {
						lines: [
							{
								value: 8,
								text: "Limite de Absorção"
							}
						]
					}
				},
				title: {
					text: 'Absorção por Turno'
				}
			}
		];
		this.chart = this.angularBillboardService.generate(...this.chartsOptions)[0];
		return this.showchart = !this.showchart;
	}
	
}
