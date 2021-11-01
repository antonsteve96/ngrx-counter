import {Post} from "../../models/post.model";

export interface PostState{
  posts: Post[];
}

export const initialState = {
  posts: []
}
