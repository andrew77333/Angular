import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {GeneralService, IRequisition} from '../../core/services/general.service';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css']
})
export class RequisitionsComponent implements OnInit, OnDestroy {

  requisitions: Array<IRequisition> = [];
  subscriptions: Subscription[] = [];
  error = {hasError: false, message: ''};

  constructor(
    private router: Router,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    const subGetRequisitions = this.generalService.getAllRequisitions().subscribe(
      res => this.requisitions = res,
      error => this.showError(error, 'ngOnInit() getAllRequisitions')
    );

    this.subscriptions.push(subGetRequisitions);
  }

  logOut(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/log-in']);
  }

  private showError(error: any, placeOfError: string): void {
    console.log(placeOfError, error);
    this.error = {hasError: true, message: 'Что-то пошло не так... Обновите страницу и повторите попытку.'};
    // this.error = {hasError: true, message: 'Ошибка сервера. Обратитесь в тех.поддержку'};
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
