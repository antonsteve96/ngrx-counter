import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {decrement, increment, reset} from "../state/counter.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {

  constructor(private store: Store<AppState>) {}

  onIncrement(){
    this.store.dispatch(increment());
  }
  onReset(){
    this.store.dispatch(reset());
  }

  onDecrement(){
    this.store.dispatch(decrement());
  }

}
