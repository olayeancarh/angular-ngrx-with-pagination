import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeamhealthComponent } from './modules/seamhealth/seamhealth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'seamhealth',
    pathMatch: 'full',
  },
  {
    path: 'seamhealth',
    loadChildren: () =>
      import('./modules/seamhealth/seamhealth.module').then(
        (m) => m.SeamhealthModule
      ),
  },
  { path: '**', redirectTo: 'seamhealth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
