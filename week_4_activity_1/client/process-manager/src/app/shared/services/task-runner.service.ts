import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TaskRunnerService {

	public httpCallsCollection = [];

	constructor(
		private http: HttpClient,
	) { }


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
