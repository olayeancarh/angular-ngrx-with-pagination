import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeamhealthRoutingModule } from './seamhealth-routing.module';
import { SeamhealthComponent } from './seamhealth.component';
import { PostTableComponent } from './post-table/post-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    SeamhealthComponent,
    PostTableComponent,
    PostsComponent
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
