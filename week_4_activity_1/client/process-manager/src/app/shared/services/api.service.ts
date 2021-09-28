import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
}
