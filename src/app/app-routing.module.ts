import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import {RequisitionsComponent} from './components/requisitions/requisitions.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'list-contacts',
    component: ListContactsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feedback-form',
    component: FeedbackFormComponent,
  },
  {
    path: 'requisitions',
    component: RequisitionsComponent,
    canActivate: [AuthGuard],
  },
  {path: '**', pathMatch: 'full', redirectTo: 'log-in'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
