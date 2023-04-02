import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Posts } from '../models';
import { handleError } from '../utils/error.utils';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl: string = environment.baseApiUrl;
  private pagePaginationSubject = new BehaviorSubject<number>(1);
  pagePaginationChange$ = this.pagePaginationSubject.asObservable();

  posts$ = this.pagePaginationChange$.pipe(
    filter(page => Boolean(page)),
    switchMap((page: number) => this.http.get<Posts[]>(`${this.baseUrl}posts?_page=${page}&_limit=10`)),
    catchError(handleError),
  );

  constructor(private http: HttpClient) {}

  // Gets posts based on passed params
  getPosts(page: number): Observable<Posts[]> {
    return this.http
      .get<Posts[]>(`${this.baseUrl}posts?_page=${page}&_limit=10`)
      .pipe(catchError(handleError));
  }

  pagePaginationChange(page: number) {
    this.pagePaginationSubject.next(page);
  }
}
