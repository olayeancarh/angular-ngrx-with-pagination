import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeamhealthRoutingModule } from './seamhealth-routing.module';
import { SeamhealthComponent } from './seamhealth.component';

@NgModule({
  declarations: [
    SeamhealthComponent
  ],
  imports: [
    CommonModule,
    SeamhealthRoutingModule
  ]
})
export class SeamhealthModule { }
