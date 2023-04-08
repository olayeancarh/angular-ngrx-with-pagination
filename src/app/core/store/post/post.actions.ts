import { Action } from '@ngrx/store';
import { Posts } from '../../models';

export enum PostActionTypes {
  LoadPosts = '[Posts] Load Posts',
  LoadPostsSuccess = '[Posts] Load Posts Success',
  LoadPostsFail = '[Posts] Load Posts Fail',
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
  constructor(public payload: number) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LoadPostsSuccess;
  constructor(public payload: Posts[]) {}
}

export class LoadPostsFail implements Action {
  readonly type = PostActionTypes.LoadPostsFail;
  constructor(public payload: any) {}
}

export type PostActions =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsFail;
