import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../material.module';
import { LayoutComponent } from './layout/layout.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './Accounts/dashboard/dashboard.component';
import { ProfileComponent } from './Accounts/profile/profile.component';
import { UserKycVerificationComponent } from './Accounts/user-kyc-verification/user-kyc-verification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from './../../../node_modules/ngx-mat-intl-tel-input';
import { UserSecurityComponent } from './Accounts/user-security/user-security.component';
import { BankAccountComponent } from './Accounts/bank-account/bank-account.component';
import { UserRefferalComponent } from './Accounts/user-refferal/user-refferal.component';
import { EWalletCryptoComponent } from './E-Wallets/e-wallet-crypto/e-wallet-crypto.component';
import { ChartModule } from 'angular2-highcharts';
import { SendCryptoComponent } from './E-Wallets/send-crypto/send-crypto.component';
import { ReceiverCryptoComponent } from './E-Wallets/receiver-crypto/receiver-crypto.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { TradeCryptoComponent } from './E-Wallets/trade-crypto/trade-crypto.component';
import { TradeCurrenciesComponent } from './E-Wallets/trade-currencies/trade-currencies.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProfileComponent,
    UserKycVerificationComponent,
    UserSecurityComponent,
    BankAccountComponent,
    UserRefferalComponent,
    EWalletCryptoComponent,
    SendCryptoComponent,
    ReceiverCryptoComponent,
    TradeCryptoComponent,
    TradeCurrenciesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    DashboardRoutingModule,
    NgxMatIntlTelInputModule,
    ChartModule,
    QRCodeModule,
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useValue: highcharts
    }
  ],
  entryComponents: [SendCryptoComponent, ReceiverCryptoComponent, TradeCryptoComponent]
})
export class DashboardModule { }
