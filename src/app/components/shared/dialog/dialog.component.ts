import { ChangeDetectionStrategy, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LITERALS } from '../../../constants/literals';

@Component({
    selector: 'app-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
    ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  literals = LITERALS;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string }
  ) {
    this.data.type = this.translateType(this.data.type);
  }

  private translateType(type: string) {
    switch (type) {
      case 'EXPENSE':
        return this.literals.expense.toLowerCase();
      case 'REVENUE':
        return this.literals.revenue.toLowerCase();
      default:
        return type;
    }
  }

  sendIsDelete(isDelete: boolean) {
    this.dialogRef.close(isDelete);
  }
}
