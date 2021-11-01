import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {autoLogout, loginSuccess} from "./auth.actions";
import {User} from "../../models/user.model";

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    //console.log(action)
    return {
      ...state,
      user: action.user
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: new User("","","",false, new Date()),
    }
  })
);

export function AuthReducer(state: any, action: any){
  return _authReducer(state, action);
}
