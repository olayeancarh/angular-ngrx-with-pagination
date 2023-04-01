import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Posts } from '../models';
import { handleError } from '../utils/error.utils';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  posts$ = this.http
    .get<Posts[]>(`${this.baseUrl}/posts`)
    .pipe(catchError(handleError));
}
