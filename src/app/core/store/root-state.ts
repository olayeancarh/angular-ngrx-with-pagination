import { PostData, initialPostState } from './post';

export interface AppState {
  posts: PostData;
}

export const initialAppState: AppState = {
  posts: initialPostState,
};
