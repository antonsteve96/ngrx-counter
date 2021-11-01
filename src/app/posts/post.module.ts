import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostListComponent} from "./post-list/post-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {StoreModule} from "@ngrx/store";
import {postReducer} from "./state/post.reducer";
import {POST_STATE_NAME} from "./state/posts.selector";
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "./state/post.effects";


const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      {path: 'add', component: AddPostComponent},
      {path: 'edit-posts/:id', component: EditPostComponent}
    ]
  }
]

@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    PostListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    EffectsModule.forFeature([PostEffects])

  ],
  providers: [],
  bootstrap: []
})
export class PostModule{}
