import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user:IUser;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) { 
    this.user = changes.user.currentValue;
  }

}
