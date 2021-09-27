import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserNew } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() usersObs;
  @Output() newItemEvent = new EventEmitter<IUserNew>();

  constructor() { }


  ngOnInit() { 
       
  }

  onClick(user) { 
    this.newItemEvent.emit(user);
  }


}
