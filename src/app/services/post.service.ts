import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root',
})
export class PostService{
  constructor(private http: HttpClient){}
    getPosts(): Observable<Post[]>{
      return  this.http.get<Post[]>(`https://ngrx-database-105ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json`).pipe(
        map((data) => {
          let posts: Post[] = [];
          for(let i=0;i<data.length;i++){
            data[i].id = (i+1).toString();
            posts = [...posts, data[i]];
          }
          return posts;
        })
      )
    }
}
