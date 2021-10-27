export class User {
  constructor(
    private token: string,
    private localId: string,
    private expirationDate: Date,
              ){}
  getLocalId(){
    return this.localId;
  }
}
