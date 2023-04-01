import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeamhealthRoutingModule } from './seamhealth-routing.module';
import { SeamhealthComponent } from './seamhealth.component';
import { PostTableComponent } from './post-table/post-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    SeamhealthComponent,
    PostTableComponent
  ],
  imports: [
    CommonModule,
    SeamhealthRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class SeamhealthModule { }
