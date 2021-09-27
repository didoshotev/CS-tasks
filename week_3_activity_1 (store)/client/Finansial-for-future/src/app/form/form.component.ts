import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IUserNew } from '../shared/interfaces';
import { UsersDataService } from '../shared/services/users-data.service';
import { Store } from '@ngrx/store';
import * as UsersListActions from '../store/actions/users-list-actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f', { static: true }) formReference: NgForm;

  myForm: FormGroup;

  public editMode: boolean = false;
  public id: string;

  public currentUser: IUserNew;

  public defaultCreditCardValue = 'visa'

  public creditCardsCollection = ['visa', 'master']

  constructor(
    // private localUsersService: LocalUsersService,
    private usersDataService: UsersDataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<{ usersCollection: { users: IUserNew[] } }>,
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe((res) => {
      this.currentUser = res.user;
    })

    this.route.params.subscribe(data => {
      this.id = data.id;
      this.id && (this.editMode = true);
    });

    this.initForm();
  }

  private initForm() {


    const user = this.currentUser

    this.myForm = this.fb.group({
      firstName: [user ? user.firstName : '', [Validators.required]],
      middleName: [user ? user.middleName : '', [Validators.required]],
      lastName: [user ? user.lastName : '', [Validators.required]],
      streetAddress: [user ? user.streetAddress : '', [Validators.required]],
      moneyBalance: [user ? user.moneyBalance : '', [Validators.required]],
      creditCards: [user ? user.creditCards : '']
    })

    this.myForm.controls['creditCards'].setValue(this.defaultCreditCardValue, { onlySelf: true })
  };


  get creditCardsForm() {
    return this.myForm.get('creditCards') as FormArray;
  }

  get form() {
    return this.myForm
  }

  onSubmitForm() {
    // strong checks
    const { firstName, middleName, lastName, streetAddress, moneyBalance, creditCards } = this.myForm.value;

    if (this.editMode) {

      const newUserObject: IUserNew = {
        ...this.currentUser, firstName, middleName,
        lastName, streetAddress, moneyBalance, creditCards: (creditCards ? [creditCards] : [])
      }
      this.usersDataService.editUser(newUserObject, this.currentUser.id);

    } else {

      // this.usersDataService.createUser({
      //   firstName, middleName, lastName,
      //   streetAddress, moneyBalance, creditCards: (creditCards ? [creditCards] : [])
      // })
      this.store.dispatch(new UsersListActions.AddUser({
          firstName, middleName, lastName,
          streetAddress, moneyBalance, creditCards: (creditCards ? [creditCards] : []) 
        }
      ))

    }

    this.myForm.reset();
    this.navigate();
  }

  navigate() {
    this.router.navigate(['/home']);
  }
}
