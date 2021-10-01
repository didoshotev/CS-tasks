import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Process } from '../models/process.model';
import { Step } from '../models/step.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public fetchOrganizations() {
    const currentUserId = this.localStorageService.getData();

    return this.http.get<any>(`${environment.api_url}/organization`)
      .pipe(
        map(organization => organization
          .filter(item => item.creatorId._id === currentUserId._id)),
      )
  }

  public createOrganization(creatorId, organizationName) {

    return this.http.post<any>(`${environment.api_url}/organization/create`,
      {
        name: organizationName,
        creatorId
      }
    ).pipe(
      tap(data => {
        console.log(data);
      })
    ).subscribe()
  }


  public createProcess(process: Process):Observable<any> {

    return this.http.post<Process>(`${environment.api_url}/process/create`,
      process,
    )
  }

  public fetchProcesses(): Observable<Process[]> {

    return this.http.get<Process[]>(`${environment.api_url}/process`)
      .pipe(
        tap(data => {
          console.log('processes data:', data);
        })
      )
  }

  public createStep(step: Step) {

    return this.http.post<any>(`${environment.api_url}/step/create`,
      step
    ).pipe(
      tap(data => {
        console.log('new step', data);
      })
    ).subscribe()
  }

}
