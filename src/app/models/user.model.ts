export class User {
  constructor(
    private email: string,
    private idToken: string,
    private localId: string,
    private isRegistered: boolean,
    private expirationDate: Date,
              ){}
  isUserRegistered(){
    return this.isRegistered;
  }
  getLocalId(){
    return this.localId;
  }
  getExpirationDate(){
    return this.expirationDate;
  }
}
