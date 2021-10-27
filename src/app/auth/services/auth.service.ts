import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../models/AuthResponseData";
import {User} from "../../models/user.model";
import {autoLogout} from "../state/auth.actions";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>){

  }
  login(email: string,password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true})
  }

  signUp(email: string,password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true})
  }


  formatUser(data: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn*1000);
    return new User(
      data.email,
      data.idToken,
      data.refreshToken,
      data.registered,
      expirationDate);
  }

  getErrorMessage(message: string){
    switch(message){
      case 'INVALID_EMAIL':
        return 'Email Not Found';
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        return 'Password Not Found';
      case 'EMAIL_EXISTS':
        return 'Email already exists'
      default:
        return 'Unknown error occurred. Please try again'
    }
  }

  runTimeOutInterval(user: User){
    const todaysDate = new Date().getTime();
    const expirationDate = user.getExpirationDate().getTime();
    const timeInterval = todaysDate - expirationDate;
    this.timeoutInterval = setTimeout(() =>
      {
        this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    },
      timeInterval);
  }

  setUserInLocalStorage(user: User){
    localStorage.setItem('userData', JSON.stringify(user));
    const todaysDate = new Date().getTime();
    const expirationDate = user.getExpirationDate().getTime();
    const timeInterval = todaysDate - expirationDate;
    this.timeoutInterval = setTimeout(() => {
        //logout functionality or get the refresh token
      },timeInterval);
    this.runTimeOutInterval(user);
  }

  getUserFromLocalStorage(){
    const userDataString = localStorage.getItem('userData');
    if(userDataString){
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expiration);
      const user = new User(userData.email, userData.idToken, userData.localId, userData.isUserRegistered,expirationDate)
      this.runTimeOutInterval(user);
      return user;
    }
    return new User("","","",false, new Date);
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
