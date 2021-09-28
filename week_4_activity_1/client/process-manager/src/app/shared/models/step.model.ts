export class Step { 
    public name: string;
    public type: string;
    public priority: number;

    constructor(name: string, type: string, priority: number) { 
        this.name = name;
        this.type = type;
        this.priority = priority;
    }
}