import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { AngularBillboardService } from 'angular-billboard';

import { ProductsService } from '../products.service';
import { ProductsEditPage } from '../edit/products.edit.page';
import { ProductDetailsPage } from '../details/product.details';
// Providers
import { AuthProvider } from '../../../providers/auth/auth';

@Component({
	templateUrl: 'products.list.html',
	providers: [ProductsService]
})
export class ProductsListPage implements OnInit {
	private service: ProductsService;
	private modalController: ModalController;

	products = [];
	groups: any = [];

	type = 'bar';
	labels:boolean = false;
	zoom:boolean = true;
	chart: any;
	chartsOptions: any[];
	showchart:boolean = false; 
	first: any = [];
	secondy: any = [];
	time: any = [];

	constructor(service: ProductsService, 
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
		let offset = this.products.length;
		let limit = 20;		
		return this.service.getItems( offset, limit).then(results => {
			if (results === '') return [];
			/* for (let index = 0; index < results.length; index++) {
				const element = results[index];
				this.time.push(element.attributes.controls[0].datetime);
				if (element.attributes.shift === "Turno I") {
					this.first.push(parseFloat(element.attributes.controls[0].average));
				}
				if (element.attributes.shift === "Turno II") {
					this.secondy.push(parseFloat(element.attributes.controls[0].average));
				}
			} */
			results.forEach(item => {
				this.products.push(item.attributes);
			});
			return this.products;
		});
		/* this.absorptions.push(this.service.getItems());
		console.log(this.absorptions); */
		
	} 

	itemSelected(informations: any) {
		this.navCtrl.push(ProductDetailsPage, informations);
	}

	 addProducts() {

		let modal = this.modalController.create(ProductsEditPage);
		modal.onDidDismiss(item => {
			if (!item) {
				return;
			}
			console.log(item);	
			this.service.addProduct(item);
			item.createdAt = new Date(); 
			this.products.unshift(item);
		});
		modal.present();
	}

	deleteAbsorption(collect){			
		let confirm = this.alertCtrl.create({
			title: 'Avaliação de Produtos',
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
						this.service.deleteCollect(collect);
					}
				}
			]
		});
		confirm.present();
	}
	getChartData(){
		
		let data: any ={};
		let columns: any =[[],[],[]];

		// Show data last result 
		//columns[0] = this.time.reverse();
		columns[1] = this.first.reverse();
		columns[2] = this.secondy.reverse();
		// Insert labels
		columns[1].unshift('Turno I');
		columns[2].unshift('Turno II');
		
		data.type = this.type;
		data.labels = this.labels;
		data.columns= columns;
		//data.x = "x";
		console.log(data);
		return data;
		
	}

	showChart(){
		this.chartsOptions = [
			{
				data: this.getChartData(),
				/* axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%d-%m-%Y"
						}
					}
				}, */
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
					text: 'Absorção Média por Turno'
				},
				zoom: {
					enabled: this.zoom
				},
			}
			
		];
		this.chart = this.angularBillboardService.generate(...this.chartsOptions)[0];
		return this.showchart = !this.showchart;
	}
	
}
