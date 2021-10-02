import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() { 

    this.form = this.fb.group({ 
      username: ['', [Validators.required, Validators.min(3)]],
      password: ['', [Validators.required, Validators.min(3)]]
    })
  }
  
  onSubmitForm() { 
    const { username, password } = this.form.value;
    this.authService.login(username, password);
    // procceed
  }

}
