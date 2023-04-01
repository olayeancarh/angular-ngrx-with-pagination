import { Posts } from "../../models";

export interface PostData {
  isLoading: boolean;
  error: Error | undefined;
  posts: Posts[];
}

export interface PostState {
  readonly post: PostData
}

export const initialPostState: PostData = {
  isLoading: false,
  error: undefined,
  posts: [],
}
