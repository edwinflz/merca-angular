import { Component, OnInit } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileService } from '@core/services/profile/profile.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  spinner: boolean;
  login: boolean;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private router: Router,
    private auth: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.login = true;
    this.spinner = false;
  }

  loginApi({ email, password }): void {
    this.spinner = true;
    this.auth.loginRestApi(email, password)
      .subscribe(data => {
        this.spinner = false;
        if (data.status === 404) {
          this.showError(data.error);
        } else {
          this.redirectLogin();
        }
      }, error => {
        this.spinner = false;
      });
  }

  registerUser({ name, email, password }): void {
    this.spinner = true;
    this.auth.registerRestApi(name, email, password)
      .subscribe(data => {
        this.spinner = false;
        if (data.status === 404) {
          this.showError(data.error);
        } else {
          // this.redirectLogin();
          console.log('registro exitoso');
        }
      }, error => {
        this.spinner = false;
        this.processError(error);
      });
  }


  processError(error): void {
    if (error.status === 422) {
      this.destructuringError(error);
    }

    if (error.status === 500) {
      this.showMessage('Oops!', 'Ocurrio un Error inesperado con el servidor!');
    }
  }

  destructuringError(error): void {
    const { error: { errors: validationErrors } } = error;

    for (const property in validationErrors) {
      if (validationErrors.hasOwnProperty(property)) {
        this.showMessage('Oops!', validationErrors[property]);
      }
    }
  }

  showMessage(first: string, second: string): void {
    this.snackBar.open(first, second, {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  redirectLogin(): void {
    this.profileService.userHasProfileShopper().subscribe((data: any) => {
      if (data.status === 404) {
        this.router.navigate(['shopper/account']);
      } else {
        this.router.navigate(['shopper/home']);
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
