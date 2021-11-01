import {createReducer, on} from "@ngrx/store";
import {initialState} from "./post.state";
import {addPost, deletePost, loadPostsSuccess, updatePost} from "./post.actions";
import {Post} from "../../models/post.model";


const _postReducer = createReducer(
  initialState,
  on(addPost, (state: any, action: any) => {
    let post = {...action.post};
    post.id = (state.posts.length+1).toString();
    return{
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(updatePost, (state: any, action: any) => {
    const updatedPost = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
     posts: updatedPost
    }
  }),
  on(deletePost, (state: any, action: any) =>{
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
