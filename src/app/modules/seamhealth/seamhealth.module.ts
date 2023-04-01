import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeamhealthRoutingModule } from './seamhealth-routing.module';
import { SeamhealthComponent } from './seamhealth.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    SeamhealthComponent
  ],
  imports: [
    CommonModule,
    SeamhealthRoutingModule,
    MatSlideToggleModule
  ]
})
export class SeamhealthModule { }
