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

  showLogin: boolean;
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
    this.showLogin = false;
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
          this.loginFirebase(email, password);
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
  }

  loginFirebase(email: string, password: string) {
    this.auth.loginWithEmail(email, password).then((data) => {
      this.loginSuccess = true;
      this.redirectLogin();
    }).catch((error) => {
      this.spinner.hide();
      console.log(error);
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
          this.registerFirebase(data.user, name, email, password);
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
  }

  registerFirebase(user: number, name: string, email: string, password: string): void {
    this.errors.length = 0;
    this.auth.registerWithEmail(email, password).then((data) => {
      this.createUsers(data, name, email);
      this.updateUidUserApi(user, data.user.uid);
    }).catch((error) => {
      this.pushError('Error al registrar el usuario: Auth Firebase');
      console.log(error);
    });
  }

  updateUidUserApi(user: number, uid: string): void {
    this.errors.length = 0;
    this.auth.updateUidUser(user, uid).subscribe((data: MessageServer) => {
      this.spinner.hide();
      if (data.status === 404) {
        this.pushError(data.error);
      }
    });
  }

  createUsers(data: any, name: string, email: string): void {

    const user = {
      uid: data.user.uid,
      email,
      nick: name
    };
    this.errors.length = 0;
    this.auth.createUserFirebase(user).then((result) => {
      this.registerSuccess = true;
    }).catch((error) => {
      this.pushError('Error al registrar el usuario: Database Firebase');
      console.log(error);
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

  showFormLogin(): void {
    this.errors.length = 0;
    this.registerSuccess = false;
    this.showLogin = true;
    this.login = true;
  }


  showFormRegister(): void {
    this.errors.length = 0;
    this.showLogin = true;
    this.login = false;
  }

}
