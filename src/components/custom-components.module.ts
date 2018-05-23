import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoItemsComponent } from './no-items/no-items.component';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import { TilesComponent } from './tiles/tiles.component';


@NgModule({
	imports: [IonicModule],
	declarations: [NoItemsComponent, FaIconComponent, TilesComponent],
	exports: [NoItemsComponent, FaIconComponent, TilesComponent]
})
export class CustomComponentsModule {
}