import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import GlobalReference from 'src/utils/Globals';
import { stepsInputs } from 'src/utils/steps';


@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss']
})
export class ProcessPageComponent implements OnInit {

  public stepsObject = stepsInputs;
  public stepsTextMatcher = GlobalReference.stepsMatcher;

  public currentUser: User;
  public organizationId;

  firstFormGroup: FormGroup;
  stepsFormGroup: FormGroup;
  
  public stepInputs;

  labelPosition: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {

    this.authService.user.subscribe(userData => {
      this.currentUser = userData;
    })

    this.route.params.subscribe(data => {
      this.organizationId = data.id;
    })

  }

  ngOnInit(): void {
    // console.log(GlobalReference.stepsMatcher);
    // console.log(stepsInputs);

    // console.log(GlobalReference.stepsMatcher);
    
    this.firstFormGroup = this.fb.group({
      firstCtrl: [''],
      linear: [''],
      paralel: [''],
    });

    this.stepsFormGroup = this.fb.group({
      steps: this.fb.array([])
    });
  }

  get steps() {
    return this.stepsFormGroup.controls["steps"] as FormArray;
  }

  get stepsControls() { 
    return this.steps.controls[0]['controls'];
  }

  public onHandleStepClick(buttonRef) {
    
    const stepType = buttonRef._elementRef.nativeElement['data-type'];
    this.initStepFormArray(stepType);
  }

  public initStepFormArray(stepType) {
    this.removeStepFromArray();
    
    const newStepsFormGroup: FormGroup = new FormGroup({});

    this.stepInputs = stepsInputs[stepType]  

    stepsInputs[stepType].forEach(inputObject => {
      newStepsFormGroup.addControl(inputObject.name, new FormControl(inputObject.defaultValue));
    });

    this.steps.push(newStepsFormGroup);
  }

  public removeStepFromArray() {
    this.steps.length > 0 && this.steps.removeAt(0); 
  }

  public onHandleSubmit() {
    console.log(this.firstFormGroup.value);
    console.log(this.stepsFormGroup.value);
    
  }

}
