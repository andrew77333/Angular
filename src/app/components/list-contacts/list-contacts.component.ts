import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { of} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService, IContact } from '../../auth/auth.service';
import { DialogWindowContactComponent } from '../dialog-window-contact/dialog-window-contact.component';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
})
export class ListContactsComponent implements OnInit {
  public listContact: Array<IContact> = [];
  public copyListContactForSearch: Array<IContact> = [];
  public jpegDefault = 'assets/img/1.jpg';
  public valueSearch = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.auth.getListContact().subscribe(
      listContact => {
        this.listContact = listContact;
        this.copyListContactForSearch = this.listContact;
      },
        error => console.log(error)
    );
  }

  addContact(): void{
    const dialogRef = this.dialog.open(DialogWindowContactComponent, {
      backdropClass: 'backgroundGrey',
      disableClose: true,
    });
    dialogRef.afterClosed()
      .pipe(switchMap(newContact => newContact ? this.auth.addContact(newContact) : of(null)))
      .subscribe(
        newContact => newContact ? this.listContact.push(newContact) : console.log('Отмена addContact'),
        error => console.log(error)
      );
  }

  editContact(i: number, contact: IContact): void {
    const dialogRef = this.dialog.open(DialogWindowContactComponent, {
      data: contact,
      backdropClass: 'backgroundGrey',
      disableClose: true,
    });
    dialogRef.afterClosed()
      .pipe(switchMap(newContact => this.auth.editContact(contact.id as number, newContact)))
      .subscribe(
        newContact => this.listContact[i] = newContact,
        error => console.log(error)
    );
  }

  deleteContact(i: number, id?: number): void{
    this.auth.deleteContact(id as number).subscribe(
      () => this.listContact.splice(i, 1),
      error => console.log(error)
    );
  }

  trackByListContact(): boolean{
    return false;
  }

  searchContact(): void {
    this.listContact = this.copyListContactForSearch.filter(contact => {
      return !contact.name?.toLowerCase().indexOf(this.valueSearch.toLowerCase());
    });
  }

  logOut(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/log-in']);
  }

}
