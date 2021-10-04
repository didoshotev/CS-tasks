import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatRadioModule} from '@angular/material/radio';

const MaterialComponents = [
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule
  // MatRadioModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [...MaterialComponents]
})
export class MaterialModule { }
