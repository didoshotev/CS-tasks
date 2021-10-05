import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepSendEmailComponent } from './step-fields/step-send-email/step-send-email.component';
import { StepUploadFileToFtpComponent } from './step-fields/step-upload-file-to-ftp/step-upload-file-to-ftp.component';
import { StepDownloadFileFromFtpComponent } from './step-fields/step-download-file-from-ftp/step-download-file-from-ftp.component';
import { StepUploadVideoComponent } from './step-fields/step-upload-video/step-upload-video.component';
import { StepSendCommandComponent } from './step-fields/step-send-command/step-send-command.component';
import { ProcessPageComponent } from './process-page.component';
import { StepFieldsComponent } from './step-fields/step-fields.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
    declarations: [
        ProcessPageComponent,
        StepFieldsComponent,

        StepSendEmailComponent,
        StepUploadFileToFtpComponent,
        StepDownloadFileFromFtpComponent,
        StepUploadVideoComponent,
        StepSendCommandComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class ProcessPageModule { }
