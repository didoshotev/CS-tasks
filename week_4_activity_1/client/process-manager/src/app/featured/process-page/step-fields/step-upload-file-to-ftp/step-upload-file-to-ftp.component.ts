import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-upload-file-to-ftp',
  templateUrl: './step-upload-file-to-ftp.component.html',
  styleUrls: ['../step-fields.component.scss']
})
export class StepUploadFileToFtpComponent implements OnInit {

    uploadFileToFtpForm: FormGroup;
    @Output() formDataEvent = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.uploadFileToFtpForm = this.fb.group({
            serverName: ['', Validators.required],
            serverNumber: ['', Validators.required],
        });
    }

    public sendData() { 
        this.formDataEvent.emit(this.uploadFileToFtpForm.value)
    }

}
