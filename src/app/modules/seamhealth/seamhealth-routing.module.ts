import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeamhealthComponent } from './seamhealth.component';

const routes: Routes = [
  {
    path: '',
    component: SeamhealthComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeamhealthRoutingModule { }
