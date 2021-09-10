import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public users = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.subscription = this.userService.getAllUsers()
      .subscribe(data => {
        console.log(data);
        return this.users = data
      });
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }
}
