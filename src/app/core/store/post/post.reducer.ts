import { PostActionTypes, PostActions } from "./post.actions";
import { PostData, initialPostState } from "./post.state";

export const postReducer = (state = initialPostState, action: PostActions): PostData => {
  switch (action.type) {
    case PostActionTypes.LoadPosts: {
      return { ...state, isLoading: true };
    }

    case PostActionTypes.LoadPostsSuccess: {
      return { ...state, posts: action.payload, isLoading: false };
    }

    case PostActionTypes.LoadPostsFail: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default: {
      return state;
    }
  }
}
