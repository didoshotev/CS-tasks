import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, delay, map, mergeMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Process } from 'src/app/shared/models/process.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { TaskRunnerService } from 'src/app/shared/services/task-runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
    selector: 'app-process-info',
    templateUrl: './process-info.component.html',
    styleUrls: ['./process-info.component.scss']
})
export class ProcessInfoComponent implements OnInit{

    @Input() processSubject: Subject<Process> = new Subject<Process>();
    public process: Process = null;

    public processStepsCollection;
    public arrangedStepsCollection;
    public level;

    public shouldProcessRun: boolean = true;

    constructor(
        private apiService: ApiService,
        private taskRunnerService: TaskRunnerService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.processSubject
            .pipe(
                tap(processReceived => {
                    this.process = processReceived;
                    return processReceived;
                }),
                mergeMap(processReceived => {
                    return this.apiService.fetchStepsByIds(processReceived.stepsCollection)
                })
            ).pipe(
                tap(stepsReceived => {
                    this.processStepsCollection = stepsReceived;
                    this.arrangeStepsCollection();
                })
            ).subscribe()
      
    }

    public arrangeStepsCollection() {
        this.arrangedStepsCollection = Array.from(Array(8), () => []);

        for (let i = 0; i < this.processStepsCollection.length; i++) {

            const step = this.processStepsCollection[i];
            const rowLevel = step.priority.level - 1;
            this.level = rowLevel + 2;


            this.arrangedStepsCollection[rowLevel].push(step)
        }
        console.log(this.arrangedStepsCollection);
    }

    public addStep() {
        this.router.navigate(
            [`process/${this.process.organization}/${this.process._id}`],
            { state: { level: this.level }, queryParams: { level: this.level } }
        )
    }

    public runProcess(start = 0) {

        // this.arrangedStepsCollection
        //   .slice(start, this.arrangedStepsCollection.length)
        //   .map(stepsLevelCollection => {

        //     if (stepsLevelCollection.length === 0) { return; }

        //     if (!this.shouldProcessRun) {
        //       console.log('process terminated!');
        //       return;
        //     }
        //     // stepsCollection.push([...stepsLevelCollection])
        //     // this.taskRunnerService.stepRunner(stepsLevelCollection.slice())
        //   })

        const stepsCollection = this.arrangedStepsCollection.flat(1);

        this.taskRunnerService.prepareStepsCollectionCalls(stepsCollection.slice())
            .pipe(
                tap(data => {
                    console.log('Completed', data.name);
                    this.openSnackBar(data.name, data.priority, true);
                }),
                catchError(err => {
                    console.log('Step failed', err);
                    this.openSnackBar('', {}, false);

                    return err;
                })
            )
            .subscribe()
    }

    public openSnackBar(name: string, priority: object, isCompleted: boolean) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 1500,
            data: { name, priority, isCompleted }
        });
    }
}
