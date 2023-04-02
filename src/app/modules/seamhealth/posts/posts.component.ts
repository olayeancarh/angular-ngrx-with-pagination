import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Posts } from 'src/app/core/models';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean | undefined;
  currentPage = 0;

  dataSource: MatTableDataSource<Posts> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private postService: PostsService) {}

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

  getPosts(): void {
    this.loading = true;
    this.postService.pagePaginationChange(this.currentPage + 1);
    this.postService.posts$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (posts) => {
        this.dataSource.data = posts;
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = 100;
        this.loading = false;
      },
      error: (err) => console.log(err),
    });
  }

  pageChanged(event: PageEvent): void {
    this.loading = true;
    this.currentPage = event.pageIndex;
    this.postService.pagePaginationChange(this.currentPage + 1);
  }
}
