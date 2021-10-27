import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CounterState} from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, state => {
  return state.counter;
});

export const getText = createSelector(getCounterState, state => {
  return state.text;
});

export const COUNTER_STATE_NAME = 'counter';
