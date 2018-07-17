import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitoringPage } from './monitoring';

@NgModule({
  declarations: [
    MonitoringPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitoringPage),
  ],
})
export class MonitoringPageModule {}
