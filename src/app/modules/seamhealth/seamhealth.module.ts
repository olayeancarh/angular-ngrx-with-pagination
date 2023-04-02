import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeamhealthRoutingModule } from './seamhealth-routing.module';
import { SeamhealthComponent } from './seamhealth.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [SeamhealthComponent, PostsComponent],
  imports: [
    CommonModule,
    SeamhealthRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
})
export class SeamhealthModule {}
