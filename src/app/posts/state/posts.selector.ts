import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./post.state";

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, state => {
  return state.posts;
});

export const getPostById = (id: string) =>
  createSelector(
    getPostsState,
    (postState) => {
      return postState.posts.filter(singlePost => singlePost.id === id)[0];
    }
  );

export const POST_STATE_NAME = 'posts';
