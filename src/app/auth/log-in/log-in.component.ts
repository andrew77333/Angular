import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, IUser } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: IUser = {};
  formLogIn: FormGroup;
  formValid = false;
  viewPassword = false;
  error = { hasError: false, message: '' };
  registrationSuccessMessage = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.registrationSuccessMessage = this.router.getCurrentNavigation()?.extras.state?.registrationSuccess;

    this.formLogIn = new FormGroup({
      phoneControl: new FormControl('', [Validators.minLength(10)]),
      passwordControl: new FormControl('', [Validators.minLength(3)]),
    });

    this.formLogIn.statusChanges.subscribe(value => {
      this.error = { hasError: false, message: '' };
      this.formValid = value === 'VALID';
    });
  }

  ngOnInit(): void {}

  submit(): void {
    const phone = this.formLogIn.value.phoneControl;
    const password = this.formLogIn.value.passwordControl;
    this.auth.logIn(phone, password).subscribe(
      res => res ? this.router.navigate(['/list-contacts'])
                      : this.error = { hasError: true, message: 'Неверный телефон или пароль' },
      error => this.error = { hasError: true, message: 'Ошибка сервера. Обратитесь в тех.поддержку' }
    );
  }

}
