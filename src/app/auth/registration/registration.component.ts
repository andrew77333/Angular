import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, IUser } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  formRegistration: FormGroup;
  user: IUser = {};
  formValid = false;
  viewPassword = true;
  passwordRepeat = '';
  error = { hasError: false, message: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.formRegistration = new FormGroup({
      nameControl: new FormControl(''),
      phoneControl: new FormControl('', [Validators.minLength(3)]),
      passwordControl: new FormControl('', [Validators.minLength(3)]),
      passwordRepeatControl: new FormControl('', [Validators.minLength(3)]),
    });

    this.formRegistration.statusChanges.subscribe(value => {
      setTimeout(() => {
        this.formValid = value === 'VALID' && this.user.password === this.passwordRepeat;
      }, 1);
    });
  }

  submit(): void{
    this.user = {
      name: this.formRegistration.value.nameControl,
      phone: this.formRegistration.value.phoneControl,
      password: this.formRegistration.value.passwordControl
    };
    this.auth.registration(this.user).subscribe(
      res => res ? this.router.navigate(['/log-in'], { state: { registrationSuccess: true } })
                      : this.error = { hasError: true, message: 'Данный номер телефона уже зарегистрирован' },
      () => this.error = { hasError: true, message: 'Ошибка сервера. Обратитесь в тех.поддержку' }
    );
  }

}
