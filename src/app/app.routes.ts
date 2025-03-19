import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'transacciones', component: TransactionsComponent },
  { path: 'transacciones/:id', component: TransactionsComponent },
  { path: 'registro', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
