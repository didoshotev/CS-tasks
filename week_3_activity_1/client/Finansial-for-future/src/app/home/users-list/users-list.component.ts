import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input() users;
  @Output() newItemEvent = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit(): void {
        
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log(changes);
    
  }

  onClick(user) { 
    this.newItemEvent.emit(user);
  }
}
