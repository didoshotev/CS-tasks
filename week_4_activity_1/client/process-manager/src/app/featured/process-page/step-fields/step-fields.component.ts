import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import GlobalReference from 'src/utils/Globals';

@Component({
    selector: 'app-step-fields',
    templateUrl: './step-fields.component.html',
    styleUrls: ['./step-fields.component.scss']
})
export class StepFieldsComponent implements OnInit {

    @Input() stepFieldsType;
    @Output() formDataEvent = new EventEmitter<object>();


    public stepsInputValues;

    constructor() { }

    ngOnInit(): void {
        console.log(this.stepFieldsType);
        
    }

    public receiveFormDataEvent(values) { 
        this.stepsInputValues = values;
    }

    public submitInputValuesAsLineal() { 
        this.formDataEvent.emit({ data: this.stepsInputValues, type: GlobalReference.processTypes.LINEAL })
    }

    public submitInputValuesAsParalel() { 
        this.formDataEvent.emit({ data: this.stepsInputValues, type: GlobalReference.processTypes.PARALEL })
    }
}
