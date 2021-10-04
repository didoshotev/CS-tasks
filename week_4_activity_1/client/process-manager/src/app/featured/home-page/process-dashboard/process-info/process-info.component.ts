import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { delay, map, mergeMap, tap } from 'rxjs/operators';
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
export class ProcessInfoComponent implements OnInit, OnDestroy {

  @Input() processSubject: Subject<Process> = new Subject<Process>();
  public process: Process = null;

  public processStepsCollection;
  public arrangedStepsCollection;
  public level;

  public processSubscription: Subscription;
  public shouldProcessRun:boolean = true;

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

     this.processSubscription = this.taskRunnerService.stepSubject.subscribe(data => {
      
      if(data.status === 'failed') { 
        console.log('UNSUB');
        this.shouldProcessRun = false;
        this.openSnackBar(data.step.name, data.step.priority, this.shouldProcessRun);
        return;
      }

      if (data.step) {
        this.openSnackBar(data.step.name, data.step.priority, true);
      }
    })
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

  public runProcess() {
    this.arrangedStepsCollection.map(stepsLevelCollection => {

      if (stepsLevelCollection.length === 0) { return; }
      console.log(this.shouldProcessRun);
      if(!this.shouldProcessRun) { 
        console.log('process terminated!');
        return;
      }
      this.runProcessLevel(stepsLevelCollection);

    })
  }

  public runProcessLevel(stepsLevelCollection) {
    // const firstStepCollection = this.arrangedStepsCollection[0];

    this.taskRunnerService.stepRunner(stepsLevelCollection.slice())
  }


  public openSnackBar(name: string, priority: object, isCompleted: boolean) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: { name, priority, isCompleted }
    });
  }

  ngOnDestroy() { 
    this.processSubscription.unsubscribe();
  }
}
