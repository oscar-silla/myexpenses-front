import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'transacciones', component: TransactionsComponent },
  { path: 'transacciones/:id', component: TransactionsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
