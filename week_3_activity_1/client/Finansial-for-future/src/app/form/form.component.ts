import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f', { static: true }) formReference: NgForm;
  
  public editMode: boolean = false;
  public id: string;
  
  public defaultCreditCardValue = ''

  constructor(
    private usersService: UsersService,
    private route: Router,
    private router: ActivatedRoute
    ) {
       
    }

  ngOnInit(): void {
    this.router.params.subscribe(data => { 
      this.id = data.id;
      this.id && (this.editMode = true);
    });
  }

  onSubmitForm() {
    
    !this.formReference.value.userData.creditCards ? delete this.formReference.value.userData.creditCards : null;
    
    this.editMode ? this.usersService.editUser(this.formReference.value.userData, this.id) :
    this.usersService.createUser(this.formReference.value.userData);


    this.formReference.form.reset();
    this.navigate();
  }

  navigate() { 
    this.route.navigate(['/home']);
  }
}
