import { EnumProcessType, IProcess } from "../interfaces/process.interface";

export class Process { 
    public type: string;
    public stepsCollection: [];
    
    constructor(type: string, stepsCollection: []) {
        this.type = type;
        this.stepsCollection = stepsCollection;
    }
}