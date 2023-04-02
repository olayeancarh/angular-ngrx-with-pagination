import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { PostParams, Posts } from 'src/app/core/models';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean | undefined;
  limit: number = 10;
  dataSize: number = 100;

  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10];

  dataSource: MatTableDataSource<Posts> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private postService: PostsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getPosts(arg?: any) {
    this.loading = true;
    let params: PostParams = {
      _limit: this.limit,
      _page: this.currentPage + 1,
    };

    params = arg ? { ...params, ...arg } : params;

    this.postService
      .getPosts(params)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (posts) => (this.dataSource.data = posts),
        complete: () => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = this.dataSize;
          this.loading = false;
          this.changeDetectorRefs.detectChanges();
        },
      });
  }

  pageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getPosts();
  }
}
