import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addPost,
  addPostSuccess,
  deletePost, deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./post.actions";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {PostsService} from "../../services/posts.service";
import {Injectable} from "@angular/core";

@Injectable()
export class PostEffects{
  constructor(private actions$: Actions, private postsService: PostsService){}
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({posts});
          })
        )
      })
    )
  })
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            console.log(post);
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            console.log(action.id);
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
