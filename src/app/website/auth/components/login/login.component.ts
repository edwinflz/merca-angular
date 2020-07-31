import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Output() sendUser: EventEmitter<any> = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  sendRequest() {
    const { email, password } = this.form.value;
    this.sendUser.emit({ email, password });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
