import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../types/models/request/transaction/transaction-request.type';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { TransactionQueryParams } from '../../types/models/request/transaction/transaction-queryparams.type';

type FormFields = {
  category: string;
  amount: number;
  description: string;
  type: string;
};

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit, OnChanges {
  @Input() transaction?: TransactionResponse;
  @Input() operationType?: string;
  transactionTypeIndex?: number;
  transactionTypes: string[] = ['EXPENSE', 'REVENUE'];
  readonly dialog = inject(MatDialog);

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.profileForm.get("type")?.setValue(params.get('type'))
    });
  }

  onTransactionTypeChange(index: number) {
    this.transactionTypeIndex = index;
    this.profileForm.get("type")?.setValue(this.transactionTypes[this.transactionTypeIndex])
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {data: {type: this.transactionTypes[this.transactionTypeIndex!]}});
    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.transactionService.delete(this.transaction!.id.toString()).subscribe({
          next: () => {
            this.router.navigate(['/home'], {queryParams: {type: this.transactionTypes[this.transactionTypeIndex!]}});
          },
          error: (err) => {
            console.log('Error deleting transaction', err);
          },
        });
      }
    });
  }

  readonly categories: string[] = [
    'FOOD',
    'HOME',
    'FINANCES',
    'WORK',
    'ENTERTAINMENT',
  ];

  profileForm = new FormGroup({
    category: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
    type: new FormControl<string>(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'] && changes['transaction'].currentValue) {
      this.route.queryParamMap.subscribe((params: ParamMap) => {
        this.profileForm.get("type")?.setValue(params.get('type'));
        this.transactionTypeIndex = this.transactionTypes.indexOf(params.get('type')!);
      });
      this.transaction && this.setFormValues(this.transaction);
    }
    
  }

  private setFormValues(transaction: TransactionResponse) {
    this.profileForm.patchValue({
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
    });
  }

  onCreate() {
    const transactionResquest = this.mapToTransactionRequest(
      this.profileForm.value as FormFields
    );
    this.transactionService.save(transactionResquest).subscribe({
      next: () => {
        this.router.navigate(['/home'], {queryParams: {type: transactionResquest.type}});
      },
      error: (err) => {
        console.log('Error saving transaction', err);
      },
    });
  }

  onModify() {
    const transactionRequest = this.mapToTransactionRequest(
      this.profileForm.value as FormFields
    );
    transactionRequest.date = this.transaction!.date; 
    const transactionQueryParams: TransactionQueryParams = {type: transactionRequest.type}
    this.transactionService
      .modify(this.transaction!.id.toString(), transactionRequest, transactionQueryParams)
      .subscribe({
        next: () => {
          this.router.navigate(['/home'], {queryParams: {type: transactionRequest.type}});
        },
        error: (err) => {
          console.log('Error modifiying transaction', err);
        },
      });
  }

  private mapToTransactionRequest(formValues: FormFields): TransactionRequest {
    return {
      ...formValues,
      date: new Date(),
    };
  }

  formValuesChanged(): boolean {
    const currentFormValues = this.profileForm.value;
    return (
      currentFormValues.amount !== this.transaction?.amount ||
      currentFormValues.category !== this.transaction?.category ||
      currentFormValues.description !== this.transaction?.description
    );
  }
}
