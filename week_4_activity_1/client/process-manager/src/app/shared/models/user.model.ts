export class User { 
    public username: string;
    public organizationsCollection: [];
    public _id: string;
    public token?: string;

    constructor(
        username: string,
        organizationsCollection: [],
        _id: string,
        token?: string,) {

        this.username                = username;
        this.organizationsCollection = organizationsCollection;
        this._id                     = _id;
        this.token                   = token
    }
}