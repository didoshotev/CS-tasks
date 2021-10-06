import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-send-command',
  templateUrl: './step-send-command.component.html',
  styleUrls: ['../step-fields.component.scss']
})
export class StepSendCommandComponent implements OnInit {

    commandFormGroup: FormGroup;
    @Output() formDataEvent = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.commandFormGroup = this.fb.group({
            cmdNumber: ['', Validators.required],
        });
    }

    public sendData() { 
        this.formDataEvent.emit(this.commandFormGroup.value)
    }

}
