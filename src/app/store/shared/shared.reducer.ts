import {setErrorMessage, setLoadingSpinner} from "./shared.actions";
import {createReducer, on} from "@ngrx/store";
import {initialState, SharedState} from "./shared.state";

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state: SharedState, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
  on(setErrorMessage, (state: SharedState, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
);

export function SharedReducer(state: any, action: any){
  return _sharedReducer(state, action)
}
