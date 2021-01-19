import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LogInComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    RegistrationComponent,
    LogInComponent,
  ]
})
export class AuthModule { }
