import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  public organizationSubscription: Subscription;
  @Input() organizationObservable: Observable<any>;
  public organization = null;

  constructor() { }

  ngOnInit(): void {

    this.organizationSubscription = this.organizationObservable.subscribe(data => { 
      this.organizationObservable = data;
      this.organization = data;
      console.log(this.organization);
      
    })
  }

  ngOnDestroy() { 
    this.organizationSubscription.unsubscribe();
  }
}
