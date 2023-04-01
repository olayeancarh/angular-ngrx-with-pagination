import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './root-state';
import { postReducer } from './post';

export const appReducers: ActionReducerMap<AppState, any> = {
  posts: postReducer,
};
