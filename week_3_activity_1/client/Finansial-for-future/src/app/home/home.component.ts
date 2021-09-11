import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from '../shared/interfaces';
import { UsersService } from './users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  public users = <IUser[]>[];
  public clickedUser:IUser;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.subscription = this.userService.getAllUsers()
      .subscribe(data => this.users = data );
  }

  triggerInfo(event:IUser): void { 
    this.clickedUser = event;
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }
}
