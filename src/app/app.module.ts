import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { DialogWindowContactComponent } from './components/dialog-window-contact/dialog-window-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ListContactsComponent,
    DialogWindowContactComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
