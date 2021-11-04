import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient){}
    getPosts(): Observable<Post[]>{
      return  this.http.get<Post[]>(`https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json`).pipe(
        map((data) => {
          let posts: Post[] = [];
          for(let key in data){
            posts = [...posts,{...data[key],id: key}]
          }
          return posts;
        })
      )
    }
  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
      post
    );
  }

  updatePost(post: Post) {
    const id: string = (post.id) ? post.id : "";
    const postData = {
      [id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
  }
}
