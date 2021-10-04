import { IPriority } from "../interfaces/priority.interface";

// Interface for all input fields if needed... 

export class Step { 
    public name: string;
    public priority: IPriority;
    public processId: string;
    public fields: Object;
    public _id?: string;

    constructor(name: string, priority: IPriority, processId: string, fields: Object, _id?: string) { 
        this.name = name;
        this.priority = priority;
        this.processId = processId;
        this.fields = fields;
        this._id =_id;
    }
}