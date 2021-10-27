import {Post} from "../../models/post.model";

export interface PostState{
  posts: Post[];
}

export const initialState = {
  posts: [
    {id: '1',title: 'Sample Title1', description: 'Sample Description 1'},
    {id: '2',title: 'Sample Title2', description: 'Sample Description 2'},
  ]
}
