import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-upload-video',
  templateUrl: './step-upload-video.component.html',
  styleUrls: ['../step-fields.component.scss']
})
export class StepUploadVideoComponent implements OnInit {

    uploadVideoForm: FormGroup;
    @Output() formDataEvent = new EventEmitter<object>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        this.uploadVideoForm = this.fb.group({
            username: ['', Validators.required],
            videoLink: ['', Validators.required],
        });
    }

    public sendData() { 
        this.formDataEvent.emit(this.uploadVideoForm.value)
    }

}
