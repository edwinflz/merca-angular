import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileService } from '../../../core/services/profile/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  spinner: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.spinner = false;
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  loginApi(event: Event): void {
    event.preventDefault();
    this.spinner = true;
    const { email, password } = this.form.value;
    this.auth.loginRestApi(email, password)
      .subscribe(data => {
        this.spinner = false;
        if (data.status === 404) {
          this.showError(data.error);
        } else {
          this.redirectLogin();
        }
      });
  }

  redirectLogin(): void {
    this.profileService.userHasProfileShopper().subscribe((data: any) => {
      if (data.status === 404) {
        this.router.navigate(['website/shopper/account']);
      } else {
        this.router.navigate(['website/shopper/home']);
      }
    });
  }



  showError(msg: string): void {
    this.snackBar.open('Error!', msg, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
