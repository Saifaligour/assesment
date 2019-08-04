import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomMaterialModule } from '../material.module';

import { IndexRoutingModule } from './index-routing.module';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UsersService } from '../services/users.service';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HomeComponent,
    IndexComponent,
    ResetPasswordComponent,
    TopNavComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class IndexModule { }
