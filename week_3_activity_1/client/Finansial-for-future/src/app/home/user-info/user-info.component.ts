import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: IUser;

  public isPrivateShown: Boolean = false;
  public loansCollection = [];

  constructor(
    private usersService: UsersService,
    private router: Router,    
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    console.log(this.user);
    this.user.loan && this.handleLoanOutput();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.user.currentValue;
  }

  handlePrivateInfo() {
    this.isPrivateShown = !this.isPrivateShown
  }

  handleDelete() {
    this.usersService.deleteUser(this.user._id);
  }

  handleEdit() { 
    console.log(this.user._id);
    
    this.router.navigate(['/form', 'edit', this.user._id]);
  }
  
  handleLoan() { 
    this.router.navigate(['/loan', this.user._id], { state: this.user });
  }

  handleLoanOutput() { 
    for (let i = 0; i < this.user.loan.length; i++) {
        const startDate = new Date(this.user.loan[i].startDate).toLocaleDateString();
        const endDate = new Date(this.user.loan[i].endDate).toLocaleDateString();
        this.loansCollection.push({ startDate, endDate, money: this.user.loan[i].money})
    }
  }
}
