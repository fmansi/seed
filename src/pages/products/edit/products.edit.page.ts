import { Component} from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { AuthProvider } from '../../../providers/auth/auth';
import { ProductsConst } from '../../../app/app.constant';
 

@Component({
	templateUrl: 'products.edit.html'
})
export class ProductsEditPage {
	private viewCtrl: ViewController;
	public items:any;
	public products: any;
	public fields: any;
	public form : FormGroup;
	public showThis: boolean = false;
	public collect : any;
	now = moment();
	nowTime;
	start1;
	end1;
	start2;
	end2;

	
	constructor(viewCtrl: ViewController, 
				params: NavParams,  
				public formBuilder: FormBuilder,
				private authPvdr: AuthProvider) {
		this.viewCtrl = viewCtrl;
		moment.locale('pt-BR');

		this.nowTime = moment(this.now, ['HH:mm']);
		this.start1 = moment(ProductsConst.start1, ['HH:mm']);
		this.end1 = moment(ProductsConst.end1, ['HH:mm']);
		this.start2 = moment(ProductsConst.start2, ['HH:mm']);
		this.products = 
			{
				name: "products",
				type: "select",
				required: false,
				display: "selected",
				selected: true,
				title: "Produto",
				options : [
					{ key: "liver",  
					  label: "Fígado",
					  validity: 40,
						fields: [
							{
								name: "gallbladder",
								value:"",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Vesícular biliar"
							},
							{
								name: "lung",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Pulmão"
							},
							{
								name: "heart",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Coração"
							}
						]
					},
					{ key: "gizzard", 
					  label: "Moela",
					  validity: 40,
						fields: [
							{
								name: "keratin",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Queratina"
							}
						]
					},
					{ key: "foot",
					  label: "Pé",
					  validity: 40,
						fields: [
							{
								name: "keratinFoot",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Queratina no pé"
							},
							{
								name: "keratinLoose",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Queratina solta"
							},
							{
								name: "footCallus",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Calo de pé"
							}
						]
					},
					{ key: "heart",   
					  label: "Coração",
					  validity: 12,
						fields: [
							{
								name: "lung",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Pulmão"
							},
							{
								name: "liver",
								value: "",
								type: "text",
								required: false,
								display: "Limite máximo 10%",
								selected: true,
								title: "Fígado"
							}
						] 
					}
				]
			};
		
		
	}
	
	valChange(value: string, index: number): void {
		this.items[0].fields[index].value = value;
	}

	onChange(product)  {
		console.log(product);
		
		this.items = this.products.options.filter(items => items.key.includes(product));
		this.showThis = true;
		console.log(this.items[0].validity);

		var user = this.authPvdr.currentUser();
		var shift = '';
		
		if (this.nowTime.isAfter(this.start1) && this.nowTime.isBefore(this.end1)) {
			shift = 'Turno I'
		} else if (this.nowTime.isAfter(this.start2) && this.nowTime.isAfter(this.end1)) {
			shift = 'Turno II'
		} 
		
		this.collect = {
			analyst : user.name,
			shift: shift,
			hour: moment().format('HH:mm:ss'),
			date : moment().format('YYYY-MM-DD'),
			year : moment().format('YYYY'),
			month : moment().format('MMMM'),
			product: this.items[0].label,
			manufactured: moment().format('YYYY-MM-DD'),
			validity: moment().add(this.items[0].validity, 'days').format('YYYY-MM-DD'),
			weight: '',
			target: ProductsConst.target,
			items: this.items[0].fields
		}
	}

	close() {
		this.viewCtrl.dismiss();
	}

	save(collect) {
		//console.info(collect);
		this.viewCtrl.dismiss(collect);
	}
	
}



