import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IContact } from '../../auth/auth.service';

@Component({
  selector: 'app-dialog-window-edit',
  templateUrl: './dialog-window-contact.component.html',
  styleUrls: ['./dialog-window-contact.component.css']
})
export class DialogWindowContactComponent {

  public newContact: IContact = {};

  constructor(
    public dialogRef: MatDialogRef<DialogWindowContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IContact,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
