import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../models/AuthResponseData";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient){

  }
  login(email: string,password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true})
  }
  formatUser(data: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn*1000);
    return new User( data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string){
    switch(message){
      case 'INVALID_EMAIL':
        return 'Email Not Found';
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        return 'Password Not Found';
      default:
        return 'Unknown error occurred. Please try again'
    }
  }
}
