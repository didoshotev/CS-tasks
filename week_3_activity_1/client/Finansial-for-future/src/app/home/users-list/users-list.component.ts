import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';

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
