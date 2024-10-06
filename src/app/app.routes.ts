import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions/:id', component: TransactionsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
