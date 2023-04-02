import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostParams, Posts } from '../models';
import { handleError } from '../utils/error.utils';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  // Gets posts based on passed params
  getPosts(params?: PostParams): Observable<Posts[]> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams.set('_page', params._page);
      httpParams.set('_limit', params._limit);
    }
    return this.http
      .get<Posts[]>(`${this.baseUrl}posts`, { params: httpParams })
      .pipe(catchError(handleError));
  }
}
