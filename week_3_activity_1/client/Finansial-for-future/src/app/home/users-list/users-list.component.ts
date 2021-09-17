import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserNew } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @Input() users;
  @Output() newItemEvent = new EventEmitter<IUserNew>();

  constructor() { }

  onClick(user) { 
    this.newItemEvent.emit(user);
  }
}
