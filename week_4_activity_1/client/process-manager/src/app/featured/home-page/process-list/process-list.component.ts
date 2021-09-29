import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.organizationSubscription = this.organizationObservable.subscribe(data => {
      this.organizationObservable = data;
      this.organization = data;
      console.log(this.organization);
    })
  }

  public onHandleAdd() {
    this.router.navigateByUrl(`process/new/${this.organization._id}`);
  }

  ngOnDestroy() {
    this.organizationSubscription.unsubscribe();
  }
}
