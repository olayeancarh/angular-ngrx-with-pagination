import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, switchMap, map, catchError, of, filter } from 'rxjs';
import * as postActions from './post.actions';
import { PostsService } from '../../services/posts.service';
import { AppState } from '../root-state';
import { getPostsByPage } from './post.selector';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private postService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType<postActions.LoadPosts>(postActions.PostActionTypes.LoadPosts),
      concatLatestFrom((actions) =>
        this.store.select(getPostsByPage(actions.payload))
      ),
      filter(([actions, posts]) => posts.length === 0),
      switchMap(([actions]) =>
        this.postService.getPosts(actions.payload).pipe(
          map(
            (items) =>
              new postActions.LoadPostsSuccess(
                items.map((item) => ({ ...item, page: actions.payload }))
              )
          ),
          catchError((error) => of(new postActions.LoadPostsFail(error)))
        )
      )
    )
  );
}
