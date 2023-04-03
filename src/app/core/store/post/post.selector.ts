import { createSelector } from '@ngrx/store';
import { PostData } from '.';
import { AppState } from '../root-state';

const getPostState = (state: AppState): PostData => state.posts;

export const getPostLoading = createSelector(
  getPostState,
  (state) => state.isLoading
);

export const getPostError = createSelector(
  getPostState,
  (state) => state.error
);

export const getPosts = createSelector(getPostState, (state) => state.posts);

export const getPostsByPage = (page: number) =>
  createSelector(getPosts, (posts) => posts.filter((post) => post.page === page));
