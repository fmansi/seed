import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { AngularBillboardModule } from 'angular-billboard';
import { DynamicFormModule } from '../../common/forms/dynamic-form.module';

import { ProductDetailsPage } from './details/product.details';
import { ProductsEditPage } from './edit/products.edit.page';
import { ProductsListPage } from './list/products.list.page';
import { CustomComponentsModule } from '../../components/custom-components.module';

import { ProductsService } from './products.service';

@NgModule({
  imports: [
    IonicModule,
    CustomComponentsModule,
    AngularBillboardModule,
    PipesModule,
    DynamicFormModule
  ],
  declarations: [
    ProductsEditPage,
    ProductDetailsPage,
    ProductsListPage
  ],
  entryComponents: [
    ProductsEditPage,
    ProductDetailsPage,
    ProductsListPage
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsPageModule {

}
