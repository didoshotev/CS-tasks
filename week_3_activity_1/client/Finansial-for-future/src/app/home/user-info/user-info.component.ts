import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUserNew } from 'src/app/shared/interfaces';
import { LocalUsersService } from 'src/app/shared/services/local-users.service';
import { UsersDataService } from 'src/app/shared/services/users-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: IUserNew;
  @Output() isInfoShown = new EventEmitter<boolean>();

  public isPrivateShown: Boolean = false;
  public loansCollection = [];

  constructor(
    private usersDataService: UsersDataService,
    private router: Router,    
    private localUsersService: LocalUsersService,
    ) { }

  ngOnInit(): void {
    // this.user.loan && this.handleLoanOutput();
    // console.log(this.user.loansCollection);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.user.currentValue;
  }

  handlePrivateInfo() {
    this.isPrivateShown = !this.isPrivateShown
  }

  handleDelete() {
    this.usersDataService.deleteUser(this.user.id);
    this.isInfoShown.emit(false);
    this.isPrivateShown = false;
  }

  handleEdit() { 
    this.router.navigate(['/form', 'edit', this.user.id]);
  }
  
  handleLoan() { 
    this.localUsersService.emitUser(this.user);
    this.router.navigate(['/loan', this.user.id], { state: this.user });
  }

  emitUser() { 
  }

  // handleLoanOutput() { 
  //   for (let i = 0; i < this.user.loan.length; i++) {
  //       const startDate = new Date(this.user.loan[i].startDate).toLocaleDateString();
  //       const endDate = new Date(this.user.loan[i].endDate).toLocaleDateString();
  //       this.loansCollection.push({ startDate, endDate, money: this.user.loan[i].money})
  //   }
  // }
}
