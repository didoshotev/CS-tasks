export class Process { 
    public name: string;
    public type: string;
    public organization: string;
    public stepsCollection?: [];
    public _id?: string;
    
    constructor(name: string, type: string, organization: string, stepsCollection?: [], _id?: string) {
        this.name = name;
        this.type = type;
        this.organization = organization;
        this.stepsCollection = stepsCollection || [];
        this._id = _id;
    }
}