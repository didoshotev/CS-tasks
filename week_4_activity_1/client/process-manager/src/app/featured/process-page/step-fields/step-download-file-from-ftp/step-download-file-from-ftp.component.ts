import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-download-file-from-ftp',
  templateUrl: './step-download-file-from-ftp.component.html',
  styleUrls: ['../step-fields.component.scss']
})
export class StepDownloadFileFromFtpComponent implements OnInit {

    downloadFileFromFtpForm: FormGroup;
    @Output() formDataEvent = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.downloadFileFromFtpForm = this.fb.group({
            yourUsername: ['', Validators.required],
            serverName: ['', Validators.required],
            serverNumber: ['', Validators.required],
        });
    }

    public sendData() { 
        this.formDataEvent.emit(this.downloadFileFromFtpForm.value)
    }

}
