import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Posts } from 'src/app/core/models';
/**
 * Data source for the PostTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PostTableDataSource extends DataSource<Posts> {
  data: Posts[] = [
    {
      userId: 2,
      id: 11,
      title: 'et ea vero quia laudantium autem',
      body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
    },
    {
      userId: 2,
      id: 12,
      title: 'in quibusdam tempore odit est dolorem',
      body: 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
    },
    {
      userId: 2,
      id: 13,
      title: 'dolorum ut in voluptas mollitia et saepe quo animi',
      body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
    },
    {
      userId: 2,
      id: 14,
      title: 'voluptatem eligendi optio',
      body: 'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum',
    },
    {
      userId: 2,
      id: 15,
      title: 'eveniet quod temporibus',
      body: 'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae',
    },
    {
      userId: 2,
      id: 16,
      title:
        'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
      body: 'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta',
    },
    {
      userId: 2,
      id: 17,
      title: 'fugit voluptas sed molestias voluptatem provident',
      body: 'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
    },
    {
      userId: 2,
      id: 18,
      title: 'voluptate et itaque vero tempora molestiae',
      body: 'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam',
    },
    {
      userId: 2,
      id: 19,
      title: 'adipisci placeat illum aut reiciendis qui',
      body: 'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas',
    },
    {
      userId: 2,
      id: 20,
      title: 'doloribus ad provident suscipit at',
      body: 'qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo',
    },
  ];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Posts[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Posts[]): Posts[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Posts[]): Posts[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'userId':
          return compare(a.userId, b.userId, isAsc);
        case 'body':
          return compare(+a.body, +b.body, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
