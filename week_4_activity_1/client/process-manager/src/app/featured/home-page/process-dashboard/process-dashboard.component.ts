import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Process } from 'src/app/shared/models/process.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-process-dashboard',
  templateUrl: './process-dashboard.component.html',
  styleUrls: ['./process-dashboard.component.scss']
})
export class ProcessDashboardComponent implements OnInit {
  
  @Input() selectedOrganizationSubject: Subject<any> = new Subject<any>();
  public currentOrganization;

  public selectedProcessSubject: Subject<Process> = new Subject<Process>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.selectedOrganizationSubject.subscribe(selectedOrg => { 
      this.currentOrganization = selectedOrg;
      // console.log(this.currentOrganization);
    })
  }

  public receiveSelectedProcess(process: Process) { 
    this.selectedProcessSubject.next(process);
    // console.log(this.selectedProcess);
  }

}
