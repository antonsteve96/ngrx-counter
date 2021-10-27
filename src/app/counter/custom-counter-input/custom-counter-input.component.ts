import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {changeText, customIncrement} from "../state/counter.actions";
import {getText} from "../state/counter.selectors";
import {Observable} from "rxjs";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  text$: Observable<string> = new Observable<string>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.text$ = this.store.select(getText);
  }

  onAdd(){
    this.store.dispatch(customIncrement({value: +this.value}));
  }

  onChangeText(){
    this.store.dispatch(changeText());
  }

}
