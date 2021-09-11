import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input('user') user: User;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
    
  }

}
