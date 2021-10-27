import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {getErrorMessage, getLoading} from "./store/shared/shared.selector";
import {AppState} from "./store/app.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngrx-counter';
  showLoading: Observable<boolean> = new Observable<boolean>();
  errorMessage: Observable<string> = new Observable<string>();
  constructor(private store: Store<AppState>){}
  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }
}
