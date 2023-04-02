import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, switchMap, map, catchError, of } from 'rxjs';
import * as postActions from './post.actions';
import { PostsService } from '../../services/posts.service';

@Injectable()
export class PostEffects {
  constructor(private _actions$: Actions, private postService: PostsService) {}

  loadPosts$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<postActions.LoadPosts>(postActions.PostActionTypes.LoadPosts),
    switchMap((actions) => this.postService.getPosts(actions.payload).pipe(
      map(items => new postActions.LoadPostsSuccess(items)),
      catchError(error => of(new postActions.LoadPostsFail(error)))
    ))
  ));
}
