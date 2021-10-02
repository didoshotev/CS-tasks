import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-org-page',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.scss']
})
export class OrgPageComponent implements OnInit {

  public form: FormGroup
  public user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.user.subscribe(userData => { 
      this.user = userData;
    })

    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  public onHandleSubmit() { 
    const { name } = this.form.value;
    this.apiService.createOrganization(this.user._id, name);
    this.router.navigateByUrl('/home');
  }
}
