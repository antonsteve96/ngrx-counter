import {createReducer, on} from "@ngrx/store";
import {initialState} from "./post.state";
import {addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess} from "./post.actions";
import {Post} from "../../models/post.model";


const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state: any, action: any) => {
    let post = {...action.post};
    return{
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    const updatedPost = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
     posts: updatedPost
    }
  }),
  on(deletePostSuccess, (state: any, action: any) =>{
    const updatedPost = state.posts.filter((post: Post) => {
      return post.id !== action.id;
    });
    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(loadPostsSuccess, (state: any,action: any) =>{
    return {
      ...state,
      posts: action.posts
    }
  })

);

export function postReducer(state: any, action: any){
  return _postReducer(state, action);
}
