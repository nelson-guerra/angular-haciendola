import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
   MAT_DIALOG_DATA,
   MatDialogRef,
   MatDialogTitle,
   MatDialogContent,
   MatDialogActions,
   MatDialogClose,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

interface DialogData {
   sku: string;
   title: string;
}

@Component({
   selector: 'app-dialog',
   standalone: true,
   imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDividerModule],
   templateUrl: './dialog.component.html',
   styleUrl: './dialog.component.scss',
})
export class DialogComponent {
   constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

   onNoClick(): void {
      this.dialogRef.close();
   }
}
