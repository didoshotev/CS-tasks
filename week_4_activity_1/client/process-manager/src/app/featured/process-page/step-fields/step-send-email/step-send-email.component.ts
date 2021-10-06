import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-step-send-email',
    templateUrl: './step-send-email.component.html',
    styleUrls: ['../step-fields.component.scss']
})
export class StepSendEmailComponent implements OnInit {

    emailFormGroup: FormGroup;
    @Output() formDataEvent = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.emailFormGroup = this.fb.group({
            yourEmail: ['', Validators.required],
            receiverEmail: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    public sendData() { 
        this.formDataEvent.emit(this.emailFormGroup.value)
    }
}
