import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Step } from '../models/step.model';

@Injectable({
  providedIn: 'root'
})
export class TaskRunnerService {

  public stepSubject:Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
  ) { }

  public stepRunner(stepCollection: []) {

    const step: Step = stepCollection.shift() || null;
    
    // base case
    if (!step) {
      this.stepSubject.next({ completed: true, status: 'completed', message: 'STEP LEVEL COMPLETED', step });
      return;
      // return of({ completed: true, message: 'STEP LEVEL COMPLETED' });
    }

    this.http.post(`${environment.api_url}/step/run/${step._id}`,
      { step },
      { observe: 'response' }
    )
    .pipe(
      tap(
        response => {
          // console.log(response);
          
          if (response.status === 200) {
            
            this.stepSubject.next({ completed: false, status: 'running', message: 'STEP LEVEL RUNNING', step });
            this.stepRunner(stepCollection);

          } else if (response.status === 400) {

            this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
            return;
            // return of({ completed: false, message: 'PROCESS FAILED' })
          }
        }),
        catchError(err => {
          this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
          return err;
          // throw new Error('ERROR OCCURED');
        })
      ).pipe(
       catchError(err => {
        console.log('error occured!');
        this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
        return err
       })
      ).subscribe()
  }
}
