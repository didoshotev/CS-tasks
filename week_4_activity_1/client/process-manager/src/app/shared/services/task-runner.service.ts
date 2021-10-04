import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Step } from '../models/step.model';

@Injectable({
	providedIn: 'root'
})
export class TaskRunnerService {

	// public stepSubject: Subject<any> = new Subject<any>();
	public httpCallsCollection = [];

	constructor(
		private http: HttpClient,
	) { }

	// public stepRunner(stepCollection: []) {

	// 	const step: Step = stepCollection.shift() || null;

	// 	// base case
	// 	if (!step) {
	// 		this.stepSubject.next({ completed: true, status: 'completed', message: 'STEP LEVEL COMPLETED', step });
	// 		return;
	// 		// return of({ completed: true, message: 'STEP LEVEL COMPLETED' });
	// 	}

	// 	this.http.post(`${environment.api_url}/step/run/${step._id}`,
	// 		{ step },
	// 		{ observe: 'response' }
	// 	)
	// 		.pipe(
	// 			// delay(2000),
	// 			tap(response => {
	// 				// console.log(response);

	// 				if (response.status === 200) {

	// 					setTimeout(() => {
	// 						this.stepSubject.next({ completed: false, status: 'running', message: 'STEP LEVEL RUNNING', step });
	// 						this.stepRunner(stepCollection);
	// 					}, 1000)

	// 				} else if (response.status === 400) {

	// 					this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
	// 					return;
	// 					// return of({ completed: false, message: 'PROCESS FAILED' })
	// 				}
	// 			}),
	// 			catchError(err => {
	// 				this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
	// 				return err;
	// 			})
	// 		).pipe(
	// 			catchError(err => {
	// 				console.log('error occured!');
	// 				this.stepSubject.next({ completed: false, status: 'failed', message: 'PROCESS FAILED', step });
	// 				return err
	// 			})
	// 		).subscribe(data => {
	// 			return data;
	// 		})
	// }

	// public paralelStepRunner():Observable<any> { 
	// }

	public prepareStepsCollectionCalls(stepsCollection: []): Observable<any> {
		this.httpCallsCollection = [];

		stepsCollection.forEach(step => {
			const id = step['_id']
			const requestObservable: Observable<any> = this.http.post(`${environment.api_url}/step/run/${id}`, { step });
			this.httpCallsCollection.push(requestObservable);
		})

		return concat(...this.httpCallsCollection);
	}
}
