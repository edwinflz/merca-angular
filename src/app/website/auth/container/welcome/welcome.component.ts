import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { MessageServer } from '@core/models/message-server.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileService } from '@core/services/profile/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  login: boolean;
  registerSuccess: boolean;
  loginSuccess: boolean;
  errors: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.login = true;
    this.registerSuccess = false;
    this.loginSuccess = false;
    this.logout();
  }

  loginApi({ email, password }): void {
    this.spinner.show();
    this.errors.length = 0;
    this.auth.loginRestApi(email, password)
      .subscribe(data => {
        this.spinner.hide();
        if (data.status === 404) {
          this.pushError(data.error);
        } else {
          this.loginSuccess = true;
          this.redirectLogin();
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
  }

  registerUser({ name, email, password }): void {
    this.spinner.show();
    this.errors.length = 0;
    this.auth.registerRestApi(name, email, password)
      .subscribe((data: MessageServer) => {
        this.spinner.hide();
        if (data.status === 404) {
          this.pushError(data.error);
        } else {
          this.registerSuccess = true;
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
  }


  processError(error): void {
    this.loginSuccess = false;

    if (error.status === 422) {
      this.destructuringError(error);
    }

    if (error.status === 500) {
      this.pushError('Error inesperado con el servidor, por favor vuelva a intentar!');
    }
  }

  destructuringError(error): void {
    const { error: { errors: validationErrors } } = error;

    for (const property in validationErrors) {
      if (validationErrors.hasOwnProperty(property)) {
        this.pushError(validationErrors[property]);
      }
    }

  }

  redirectLogin(): void {
    this.profileService.userHasProfileShopper().subscribe((data: any) => {
      this.loginSuccess = false;
      if (data.status === 404) {
        this.router.navigate(['shopper/account']);
      } else {
        this.router.navigate(['shopper/home']);
      }
    }, error => {
      this.processError(error);
    });
  }

  pushError(msg: string): void {
    this.errors.push(msg);
  }

  registerChange(): void {
    this.login = true;
    this.registerSuccess = false;
  }

  logout(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const logout = +params.sure;
      if (logout === 1) {
          this.auth.logout();
          this.router.navigate(['/']);
      }
    });
  }

}
