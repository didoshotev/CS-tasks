import { IPriority } from "../interfaces/priority.interface";

// Interface for all input fields if needed... 

export class Step { 
    public name: string;
    public priority: IPriority;
    public processId: string;
    public fields: Object;

    constructor(name: string, priority: IPriority, processId: string, fields: Object) { 
        this.name = name;
        this.priority = priority;
        this.processId = processId;
        this.fields = fields;
    }
}