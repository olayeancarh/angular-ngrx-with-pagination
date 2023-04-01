import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'SeamHealth',
      logOnly: environment.production,
      maxAge: 25
    })
  ]
})
export class RootStoreModule { }
