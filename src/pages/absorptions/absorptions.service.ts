import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ENV } from '../../app/app.constant';
//import { AbsorptionsConst } from '../../app/app.constant';
//import { AbsorptionsItem } from './models/absorptions.model';
//import { uuid } from '../../services/uuid';
import { Parse } from 'parse';



@Injectable()
export class AbsorptionsService {
	private key = 'absorption-key';

	private http: Http;
	private parseAppId: string = JSON.parse(localStorage.getItem("settings-serverApiId")) || ENV.parseAppId;
	private parseServerUrl: string = JSON.parse(localStorage.getItem("settings-serverURL")) || ENV.parseServerUrl;
	private absorptionDB: string = JSON.parse(localStorage.getItem("settings-serverDB")) || ENV.absorptionDB;
	data: any;

	constructor(http: Http) {
		this.http = http;
		this.parseInitialize();
		console.log('Initiated Parse');
		console.log(this.key);
		
	}

 	/* public getItems(): AbsorptionsItem[] {
		let items = localStorage.getItem(this.key);
		return items ? JSON.parse(items) : [];
	}  */
	/*
	public addItem(item: AbsorptionsItem) {
		item.id = uuid();
		let items = this.getItems();
		console.log(items);
		
		items.push(item);
		this.saveItems(items);
	}

	public deleteItem(id: string) {
		let items = this.getItems();
		items = items.filter(x => x.id !== id);
		this.saveItems(items);
	}

	public updateItem(item: AbsorptionsItem) {
		let items = this.getItems();
		let storedItem = <AbsorptionsItem>items.find(x => x.id === item.id);
		storedItem.name = item.name;
		storedItem.datetime = item.datetime;
		storedItem.shift = item.shift;
		storedItem.permanence = item.permanence;
		storedItem.controls = item.controls;
		this.saveItems(items);
	}

	private saveItems(items: AbsorptionsItem[]) {
		localStorage.setItem(this.key, JSON.stringify(items));
	}
 */
	private parseInitialize() {
		Parse.initialize(this.parseAppId);
		Parse.serverURL = this.parseServerUrl;
	}

	public deleteAbsortion(absorption){
		console.log(absorption);
		
		const Absorption = new Parse.Query(this.absorptionDB);
		Absorption.get(absorption.objectId ,{
			success: function(obj){
				obj.destroy({
					success: function(obj){
						console.log("Objeto destruido " + obj.id);
					},
					error: function(obj, err){
						console.error(err);					
					}
				})
				console.log(obj.id);
			},
			error: function(obj, err){
				console.error(obj.id);
			}
		});
	}

	public addAbsorption(newAbsorption): Promise<any> {
		const Absorption = Parse.Object.extend(this.absorptionDB);
		
		console.log(newAbsorption);
		let key = this.key;

		let absorption = new Absorption();
		absorption.set('name', newAbsorption.name);
		absorption.set('codigo', newAbsorption.codigo);
		absorption.set('revision', newAbsorption.revision);
		absorption.set('date', newAbsorption.date);
		absorption.set('month', newAbsorption.month);
		absorption.set('year', newAbsorption.year);
		absorption.set('analyst', newAbsorption.analyst);
		absorption.set('shift', newAbsorption.shift);
		absorption.set('controls', newAbsorption.controls);
		absorption.set('target', newAbsorption.target);
		absorption.set('bubbles', newAbsorption.bubbles);
		absorption.set('drips', newAbsorption.drips);
		absorption.set('permanence', newAbsorption.permanence);
		absorption.set('cheatMode', false);
		
		return absorption.save(null, {
			success: function (absorption) {
				console.log(key);
				localStorage.setItem(key, JSON.stringify(absorption));
				return absorption.id;
			},
			error: function (absorption, error) {
				console.log(error);
				return error;
			}
		});
	}
	
	public getItems(offset: number = 0, limit: number = 3): Promise<any> {
		if (this.data) {
			return Promise.resolve(this.data);
		}
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const ParseClasse = Parse.Object.extend(this.absorptionDB);
				let query = new Parse.Query(ParseClasse);
				query.descending("createdAt");
				query.skip(offset);
				query.limit(limit);
				query.find().then((Results) => {
					resolve(Results);
					//console.log(Results[0].attributes.controls);
				}, (error) => {
					reject(error);
				});
			}, 500);
		});
	}
}