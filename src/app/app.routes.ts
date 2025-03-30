import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'transacciones',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transacciones/:id',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'registro', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verificacion', component: VerificationComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
];
