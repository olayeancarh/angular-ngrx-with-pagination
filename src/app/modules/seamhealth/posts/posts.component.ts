import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, delay, takeUntil, tap } from 'rxjs';
import { Posts } from 'src/app/core/models';
import { LoadPosts, getPostsByPage } from 'src/app/core/store/post';
import { AppState } from 'src/app/core/store/root-state';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean | undefined;
  currentPage = 0;

  dataSource: MatTableDataSource<Posts> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getPosts(event?: PageEvent): void {
    this.loading = true;
    this.currentPage = event ? event.pageIndex : this.currentPage;
    this.store.dispatch(new LoadPosts(this.currentPage + 1));
    this.store
      .select(getPostsByPage(this.currentPage + 1))
      .pipe(
        tap((posts) => posts.length > 0 && (this.dataSource.data = posts)),
        delay(1000),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = 100;
        this.loading = false;
      });
  }
}
