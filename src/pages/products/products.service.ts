import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ENV } from '../../app/app.constant';
import { ProductsConst } from '../../app/app.constant';
//import {ProductsItem } from './models/product.model';
//import { uuid } from '../../services/uuid';
import { Parse } from 'parse';

@Injectable()
export class ProductsService {
	private key = 'product-key';

	private http: Http;
	private parseAppId: string = JSON.parse(localStorage.getItem("settings-serverApiId")) || ENV.parseAppId;
	private parseServerUrl: string = JSON.parse(localStorage.getItem("settings-serverURL")) || ENV.parseServerUrl;
	private productsDB: string = JSON.parse(localStorage.getItem("settings-productDB")) || ProductsConst.dbName;
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

	public deleteCollect(absorption){
		console.log(absorption);
		
		const Absorption = new Parse.Query(this.productsDB);
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

	public addProduct(newCollect): Promise<any> {
		const Product = Parse.Object.extend(this.productsDB);
		
		console.log(newCollect);
		let key = this.key;

		let collect = new Product();
		collect.set('name', ProductsConst.docName);
		collect.set('codigo', ProductsConst.codigo);
		collect.set('revision', ProductsConst.revision);
		collect.set('date', newCollect.date);
		collect.set('hour', newCollect.hour);
		collect.set('product', newCollect.product);
		collect.set('month', newCollect.month);
		collect.set('year', newCollect.year);
		collect.set('analyst', newCollect.analyst);
		collect.set('shift', newCollect.shift);
		collect.set('items', newCollect.items);
		collect.set('weight', newCollect.weight);
		collect.set('outhers', newCollect.outhers);
		collect.set('manufactured', newCollect.manufactured);
		collect.set('validity', newCollect.validity);
		collect.set('target', newCollect.target);
		collect.set('cheatMode', false);
		
		return collect.save(null, {
			success: function (collect) {
				console.log(key);
				localStorage.setItem(key, JSON.stringify(collect));
				return collect.id;
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
				const ParseClasse = Parse.Object.extend(this.productsDB);
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