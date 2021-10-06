import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { IPriority } from 'src/app/shared/interfaces/priority.interface';
import { Process } from 'src/app/shared/models/process.model';
import { Step } from 'src/app/shared/models/step.model';
import { ApiService } from 'src/app/shared/services/api.service';
import GlobalReference from 'src/utils/Globals';
import { stepsInputs } from 'src/utils/steps';

@Component({
    selector: 'app-process-page',
    templateUrl: './process-page.component.html',
    styleUrls: ['./process-page.component.scss']
})
export class ProcessPageComponent implements OnInit {

    public priorityLevel = [1, 1];

    public stepsData = stepsInputs;
    public stepsTextMatcher = GlobalReference.stepsMatcher;

    public currentProcess: Process;
    public organizationId;
    public processId;

    public editMode: boolean;
    public isPreviousStepParalel: boolean;

    processFormGroup: FormGroup;
    stepsChoicesFormGroup: FormGroup;
    stepsFormGroup: FormGroup;

    public stepInputs;
    public paralelStepInputs = [];

    public stepFieldsType;

    @ViewChild('stepper') private myStepper: MatStepper;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private fb: FormBuilder
    ) {

        this.route.params.subscribe(paramsData => {

            paramsData.processId ?
                (this.processId = paramsData.processId, this.editMode = true) :
                (this.processId = null, this.editMode = false);
            this.organizationId = paramsData.organizationId;
        })

    }

    ngOnInit(): void {
        this.priorityLevel[0] = +this.route.snapshot.queryParamMap.get('level') || 1;
        this.initForms();
        this.processId && this.fetchProcess();

    }

    public initForms() {
        this.processFormGroup = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
        });

        this.stepsChoicesFormGroup = this.fb.group({
            stepChoosen: ['', Validators.required],
        })

        this.stepsFormGroup = this.fb.group({
            steps: this.fb.array([], Validators.required),
        });
    }

    get stepChoices() {
        return this.stepsChoicesFormGroup.controls["stepChoosen"] as FormArray;
    }

    get steps() {
        return this.stepsFormGroup.controls["steps"] as FormArray;
    }

    public onHandleStepClick(key) {

        this.removeFormGroup();

        const newStepsFormGroup: FormGroup = new FormGroup({});

        const selectedInputObject = this.findInputObject(key);
        this.stepInputs = selectedInputObject.inputs;

        this.steps['name'] = selectedInputObject.key;

        selectedInputObject.inputs.forEach(input => {
            newStepsFormGroup.addControl(input.name, new FormControl(''));
        })

        this.steps.push(newStepsFormGroup);
    }

    public onCheckboxChange(event, key) {
        event.target.checked && this.onHandleStepClick(key);
    }

    public removeFormGroup() {
        this.steps.length > 0 && this.steps.removeAt(0);
    }

    public fetchProcess() {
        this.apiService.fetchProcessesByIds(this.processId)
            .subscribe(processData => {
                this.currentProcess = processData[0];
            })
    }

    public handleSendInputFieldsKey() {
        this.stepFieldsType = this.stepChoices.value;
    }

    public createProcess() {
        const { name, type } = this.processFormGroup.value;
        console.log(name, type);

        const newProcess = new Process(name, type, this.organizationId);

        this.apiService.createProcess(newProcess)
            .subscribe(newProcess => {
                this.currentProcess = newProcess;
            })
    }

    public createStep(fields) {

        const name = this.steps['name'];
        console.log(fields);

        const priority: IPriority = { level: this.priorityLevel[0], line: this.priorityLevel[1] }

        const newStep = new Step(name, priority, this.currentProcess._id, fields);

        this.apiService.createStep(newStep);
    }

    public receiveFormData(receivedInputObject) {

        receivedInputObject.type === GlobalReference.processTypes.LINEAL ?
            this.submitLineal(receivedInputObject.data) :
            this.submitParalel(receivedInputObject.data);
        
        this.myStepper.previous();
    }

    public submitLineal(fields) {
        this.isPreviousStepParalel && this.incrementLineal();
        this.createStep(fields);
        this.incrementLineal();
    }

    public submitParalel(fields) {
        this.createStep(fields);
        this.incrementParalel();
        this.isPreviousStepParalel = true;
    }

    public handleFinish() {
        this.router.navigateByUrl('/');
    }

    public findInputObject(key) {
        return this.stepsData.find(item => item.key === key);
    }

    private incrementParalel() {
        this.priorityLevel[1]++;
    }

    private incrementLineal() {
        this.priorityLevel[1] = 1;
        this.priorityLevel[0]++;
        this.isPreviousStepParalel = false;
    }
}
