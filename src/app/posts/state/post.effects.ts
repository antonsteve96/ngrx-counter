import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadPosts, loadPostsSuccess} from "./post.actions";
import {map, mergeMap} from "rxjs/operators";
import {PostService} from "../../services/post.service";
import {Injectable} from "@angular/core";

@Injectable()
export class PostEffects{
  constructor(private actions$: Actions, private postService: PostService){}
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({posts});
          })
        )
      })
    )
  })
}
