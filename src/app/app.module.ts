import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {HeaderComponent} from "./shared/components/header/header.component";
import {appReducer} from "./store/app.state";
import {SharedReducer} from "./store/shared/shared.reducer";
import {SHARED_STATE_NAME} from "./store/shared/shared.selector";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    FormsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
