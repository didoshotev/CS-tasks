import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../shared/interfaces';
import { UsersService } from '../shared/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  public users = <IUser[]>[];
  public clickedUser:IUser;

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {

    this.subscription = this.userService.getAllUsers()
      .subscribe(data => this.users = data );
  }

  handleCreateUserNavigate() { 
    this.router.navigateByUrl('/form/new');
  }

  triggerInfo(event:IUser): void { 
    this.clickedUser = event;
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }
}
