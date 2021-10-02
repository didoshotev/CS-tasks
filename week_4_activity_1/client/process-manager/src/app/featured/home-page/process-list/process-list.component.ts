import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, retry, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  public organizationSubscription: Subscription;
  @Input() organizationObservable: Observable<any>;
  public organization = null;
  public organizationProcesses;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.organizationSubscription = this.organizationObservable
    .pipe(
      tap(data => { 
        this.organization = data
        return data
      }),
      mergeMap(data =>  this.apiService.fetchProcessesByIds(data.processCollection))
    ).pipe(
      tap(processes => { 
        this.organizationProcesses = processes;
      })
    ).subscribe()
  }

  public onHandleAdd() {
    this.router.navigateByUrl(`process/new/${this.organization._id}`);
  }

  ngOnDestroy() {
    this.organizationSubscription.unsubscribe();
  }
}
