import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {GeneralService, IRequisition} from '../../core/services/general.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit, OnDestroy {

  sendSuccessMessage = '';
  feedbackForm: FormGroup;
  formValid = false;
  requestPending = false;
  subscriptions: Subscription[] = [];
  error = {hasError: false, message: ''};

  constructor(
    private router: Router,
    private generalService: GeneralService,
  ) {
    this.feedbackForm = new FormGroup({
      nameControl: new FormControl('', [Validators.minLength(3)]),
      phoneControl: new FormControl('', [Validators.minLength(10)]),
      emailControl: new FormControl('', [Validators.minLength(3), Validators.email]),
      messageControl: new FormControl('', [Validators.minLength(3)]),
    });

    const subFormChanges = this.feedbackForm.statusChanges.subscribe(value => {
      this.error = {hasError: false, message: ''};
      this.formValid = value === 'VALID';
    });

    this.subscriptions.push(subFormChanges);
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.requestPending) {
      return;
    }
    this.requestPending = true;

    const requisition: IRequisition = {
      name: this.feedbackForm.value.nameControl,
      phone: this.feedbackForm.value.phoneControl,
      email: this.feedbackForm.value.emailControl,
      message: this.feedbackForm.value.messageControl
    };

    const subSendApplication = this.generalService.sendRequisition(requisition)
      .pipe(take(1))
      .subscribe(
        () => {
          this.requestPending = false;
          this.feedbackForm.reset();
          this.sendSuccessMessage = 'Сообщение успешно отправлено';
        },
        error => this.showError(error, 'submit() sendApplication')
      );

    this.subscriptions.push(subSendApplication);
  }

  private showError(error: any, placeOfError: string): void {
    console.log(placeOfError, error);
    this.requestPending = false;
    // this.error = {hasError: true, message: 'Что-то пошло не так... Обновите страницу и повторите попытку.'};
    this.error = {hasError: true, message: 'Ошибка сервера. Обратитесь в тех.поддержку'};
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
