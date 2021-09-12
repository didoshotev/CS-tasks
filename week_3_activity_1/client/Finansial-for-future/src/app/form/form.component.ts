import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f', { static: true }) formReference: NgForm;

  public defaultCreditCardValue = ''

  constructor(
    private usersService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    
    !this.formReference.value.userData.creditCards ? delete this.formReference.value.userData.creditCards : null;
    this.usersService.createUser(this.formReference.value.userData);

    this.formReference.form.reset();
    this.navigate();
  }

  navigate() { 
    this.router.navigate(['/home']);
  }
}
