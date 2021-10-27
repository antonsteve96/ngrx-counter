export const initialState: CounterState = {
  counter: 0,
  text: 'web dev'
}

export interface CounterState {
  counter: number;
  text: string;
}
