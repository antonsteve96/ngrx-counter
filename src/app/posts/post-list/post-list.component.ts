import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {getPosts} from "../state/posts.selector";
import {deletePost} from "../state/post.actions";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]> = new Observable<Post[]>();
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: string){
    if(confirm("Are you sure you want to delete?")){
      this.store.dispatch(deletePost({ id }))
    }
  }

}
