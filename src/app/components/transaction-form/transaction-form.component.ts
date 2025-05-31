import {
  ViewEncapsulation,
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
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionRequest } from '../../types/models/request/transaction/transaction-request.type';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { TransactionQueryParams } from '../../types/models/request/transaction/transaction-queryparams.type';
import { LITERALS } from '../../constants/literals';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type FormFields = {
  category: string;
  amount: number;
  description: string;
  type: string;
};

@Component({
  selector: 'app-transaction-form',
  encapsulation: ViewEncapsulation.None,
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit, OnChanges {
  @Input() transaction?: TransactionResponse;
  @Input() operationType?: string;
  literals = LITERALS;
  isLoading: boolean = false;
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
      if (params.get('type')) {
        this.formGroup.get('type')?.setValue(params.get('type'));
        this.transactionTypeIndex = this.transactionTypes.indexOf(
          params.get('type')!
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'] && changes['transaction'].currentValue) {
      this.route.queryParamMap.subscribe((params: ParamMap) => {
        this.formGroup.get('type')?.setValue(params.get('type'));
        this.transactionTypeIndex = this.transactionTypes.indexOf(
          params.get('type')!
        );
      });
      this.transaction && this.setFormValues(this.transaction);
    }
  }

  onTransactionTypeChange(index: number) {
    this.transactionTypeIndex = index;
    this.formGroup
      .get('type')
      ?.setValue(this.transactionTypes[this.transactionTypeIndex]);
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { type: this.transactionTypes[this.transactionTypeIndex!] },
    });
    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.isLoading = true;
        this.transactionService
          .delete(this.transaction!.id.toString())
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/inicio'], {
                queryParams: {
                  type: this.transactionTypes[this.transactionTypeIndex!],
                },
              });
            },
            error: (err) => {
              console.log('Error deleting transaction', err);
              this.isLoading = false;
            },
          });
      }
    });
  }

  categories: string[] = [
    this.literals.categories.food.toUpperCase(),
    this.literals.categories.home.toUpperCase(),
    this.literals.categories.finances.toUpperCase(),
    this.literals.categories.work.toUpperCase(),
    this.literals.categories.entertainment.toUpperCase(),
  ];

  formGroup = new FormGroup({
    category: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
    type: new FormControl<string>(''),
  });

  selectCategory(category: string) {
    this.formGroup.controls['category'].setValue(category);
  }

  private setFormValues(transaction: TransactionResponse) {
    this.formGroup.patchValue({
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
    });
  }

  onCreate() {
    const transactionResquest = this.mapToTransactionRequest(
      this.formGroup.value as FormFields
    );
    this.isLoading = true;
    this.transactionService.save(transactionResquest).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/inicio'], {
          queryParams: { type: transactionResquest.type },
        });
      },
      error: (err) => {
        console.log('Error saving transaction', err);
        this.isLoading = false;
      },
    });
  }

  onModify() {
    const transactionRequest = this.mapToTransactionRequest(
      this.formGroup.value as FormFields
    );
    transactionRequest.date = this.transaction!.date;
    const transactionQueryParams: TransactionQueryParams = {
      type: transactionRequest.type,
    };
    this.isLoading = true;
    this.transactionService
      .modify(
        this.transaction!.id.toString(),
        transactionRequest,
        transactionQueryParams
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/inicio'], {
            queryParams: { type: transactionRequest.type },
          });
        },
        error: (err) => {
          console.log('Error modifiying transaction', err);
          this.isLoading = false;
        },
      });
  }

  private mapToTransactionRequest(formValues: FormFields): TransactionRequest {
    return {
      ...formValues,
      category: this.translateCategory(formValues.category),
      date: new Date(),
    };
  }

  private translateCategory(category: string): string {
    switch (category) {
      case this.literals.categories.food.toUpperCase():
        return 'FOOD';
      case this.literals.categories.home.toUpperCase():
        return 'HOME';
      case this.literals.categories.finances.toUpperCase():
        return 'FINANCES';
      case this.literals.categories.work.toUpperCase():
        return 'WORK';
      case this.literals.categories.entertainment.toUpperCase():
        return 'ENTERTAINMENT';
      default:
        return category;
    }
  }

  formValuesChanged(): boolean {
    const currentFormValues = this.formGroup.value;
    return (
      currentFormValues.amount !== this.transaction?.amount ||
      currentFormValues.category !== this.transaction?.category ||
      currentFormValues.description !== this.transaction?.description
    );
  }

  protected filterCategories(): string[] {
    return this.categories.filter((category) =>
      category
        .toLowerCase()
        .includes(this.formGroup.controls['category'].value!.toLowerCase())
    );
  }

  protected isValidForm(): boolean {
    const currentFormValues = this.formGroup.value;
    return currentFormValues.amount! > 0 && currentFormValues.category! != '';
  }
}
