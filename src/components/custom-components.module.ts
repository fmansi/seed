import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoItemsComponent } from './no-items/no-items.component';
import { FaIconComponent } from './fa-icon/fa-icon.component';


@NgModule({
	imports: [IonicModule],
	declarations: [ NoItemsComponent, FaIconComponent],
	exports: [ NoItemsComponent, FaIconComponent]
})
export class CustomComponentsModule {
}