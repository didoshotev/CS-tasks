import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users;
  @Output() newItemEvent = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit(): void {
        
  }

  onClick(user) { 
    this.newItemEvent.emit(user);
  }
}
