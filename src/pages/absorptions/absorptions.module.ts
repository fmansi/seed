import { IonicModule, IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { AngularBillboardModule } from 'angular-billboard';

import { TabsPage } from './tabs/tabs';
import { TemperaturesPage } from './temperatures/temperatures';
import { TimersPage } from './timers/timers';
import { WeightsPage } from './weights/weights';

import { AbsorptionDetailsPage } from './details/absorption.details';
import { AbsorptionsEditPage } from './edit/absorptions.edit.page';
import { AbsorptionsListPage } from './list/absorptions.list.page';
import { CustomComponentsModule } from '../../components/custom-components.module';

import { AbsorptionsService } from './absorptions.service';


@NgModule({
	imports: [
        IonicModule,
        CustomComponentsModule,
        AngularBillboardModule,
        PipesModule
    ],
	declarations: [
		TabsPage, 
        TemperaturesPage, 
        TimersPage, 
        WeightsPage,
        AbsorptionsEditPage,
        AbsorptionDetailsPage,
        AbsorptionsListPage
	],
	entryComponents: [
		TabsPage, 
        TemperaturesPage, 
        TimersPage, 
        WeightsPage,
        AbsorptionsEditPage,
        AbsorptionDetailsPage,
        AbsorptionsListPage
    ],
    providers: [
        AbsorptionsService
    ]
})
export class AbsorptionsPageModule {

}