import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {addPost} from "../state/post.actions";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
      ]),
      description: new FormControl('', [
          Validators.required,
          Validators.minLength(10)
      ])
    });
  }

  onAddPost(){
    if(!this.postForm.valid){
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({ post }));
  }

}
