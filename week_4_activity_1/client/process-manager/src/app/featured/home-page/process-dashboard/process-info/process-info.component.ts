import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Process } from 'src/app/shared/models/process.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-process-info',
  templateUrl: './process-info.component.html',
  styleUrls: ['./process-info.component.scss']
})
export class ProcessInfoComponent implements OnInit {

  @Input() processSubject: Subject<Process> = new Subject<Process>();
  public process: Process = null;

  public processStepsCollection;

  constructor(
    private apiService: ApiService
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
          console.log('stepsReceived', this.processStepsCollection);
        })
      ).subscribe()
  }
}
