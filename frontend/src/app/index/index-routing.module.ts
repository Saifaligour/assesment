import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


// routing for index module
const routes: Routes = [
  {path: 'index', component: IndexComponent},
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: 'register', redirectTo: '', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'emailverification', component: HomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'signup/:referalCode', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
