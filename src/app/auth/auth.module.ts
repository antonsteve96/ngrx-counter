import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {CommonModule} from "@angular/common";
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";

const routes: Routes = [
  {path: '', children: [
      { path: '', redirectTo:'login' },
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EffectsModule.forFeature(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class AuthModule{}
