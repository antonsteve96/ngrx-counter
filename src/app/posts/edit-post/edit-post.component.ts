import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {initialPost, Post} from "../../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {getPostById} from "../state/posts.selector";
import {updatePost} from "../state/post.actions";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post = initialPost;
  postForm!: FormGroup;
  postSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = (params.get('id') || '').toString();
      this.postSubscription = this.store.select(getPostById(id)).subscribe((data) => {
        this.post = data;
        this.createForm();
      });
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onSubmit(){
    if(!this.postForm.valid)
      return;
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      id: this.post.id,
      title,
      description,
    };
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

}
