import { Component } from '@angular/core';
import { ExpensesListComponent } from '../../components/expenses-list/expenses-list.component';
import { FabButtonComponent } from '../../components/fab-button/fab-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExpensesListComponent, FabButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
