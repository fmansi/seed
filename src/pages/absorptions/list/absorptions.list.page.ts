import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';

import { AbsorptionsService } from '../absorptions.service';
import { AbsorptionsItem } from '../models/absorptions.model';
import { AbsorptionsEditPage } from '../edit/absorptions.edit.page';
import { AbsorptionDetailsPage } from '../details/absorption.details';

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

	constructor(service: AbsorptionsService, 
				modalController: ModalController,
				public navCtrl: NavController,
				public alertCtrl: AlertController) {
		this.service = service;
		this.modalController = modalController;
	}

	ngOnInit(): void {
		this.loadItems();
	}
	
	
	
	private loadItems(){
		let offset = this.absorptions.length;
		let limit = 20;
		return this.service.getItems( offset, limit).then(results => {
			if (results === '') return [];
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
			console.log(item);
			
			this.service.addAbsorption(item);
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

}
