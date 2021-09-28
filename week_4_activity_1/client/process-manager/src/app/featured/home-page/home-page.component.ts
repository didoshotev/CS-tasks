import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public organizations: [];
  public selectedOrganizationSubject: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.fetchOrganizations().subscribe(data => {
      this.organizations = data
      console.log(this.organizations);
      
    })
  }

  public handleChangeOrganization(item) { 
    this.selectedOrganizationSubject.next(item);

  }

}
