import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { NgxMaskModule } from 'ngx-mask';

import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';

const modules = [
  CommonModule,
  BrowserModule,
  HttpClientModule,
  NoopAnimationsModule,
  AppRoutingModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatCardModule,
  MatDialogModule,
  NgxTrimDirectiveModule,
  NgxLowerCaseDirectiveModule,
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...modules,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ...modules,
    NgxMaskModule,
  ]
})
export class SharedModule { }
