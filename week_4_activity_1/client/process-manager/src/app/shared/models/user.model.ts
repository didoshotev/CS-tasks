export class User { 
    public username: string;
    public organizationsCollection: [];
    public token: string;
    public _id?: string;

    constructor(username: string, organizationsCollection: [], token: string,
         _id?: string) {

        this.username                = username;
        this.organizationsCollection = organizationsCollection;
        this._id                     = _id;
        this.token                   = token
    
    }
}