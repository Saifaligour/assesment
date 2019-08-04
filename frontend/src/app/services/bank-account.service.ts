import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private apiService: ApiService) { }

  // create bank account service method
  public createBankAccount(
    account_no: string,
    swift_code: string,
    card_no: string,
    ac_holdername: string,
    ac_holder_firstname: string,
    ac_holder_lastname: string,
    ac_holder_moblile: any,
    ac_holder_email: string,
    currency: string,
    branch_name: string,
    ac_statement: File

  ): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('account_no', account_no);
    formData.append('swift_code', swift_code);
    formData.append('card_no', card_no);
    formData.append('ac_holdername', ac_holdername);
    formData.append('ac_holder_firstname', ac_holder_firstname);
    formData.append('ac_holder_lastname', ac_holder_lastname);
    formData.append('ac_holder_moblile', ac_holder_moblile);
    formData.append('ac_holder_email', ac_holder_email);
    formData.append('currency', currency);
    formData.append('branch_name', branch_name);
    formData.append('ac_statement', ac_statement);
    return this.apiService.request('post', 'createBankAccount', formData);
  }

  // getting bank account data
  public getBankAccount(): Observable<any> {
    return this.apiService.request('get', 'bankAccount');
  }

  // update user currency
  public changeCurrency(currency): Observable<any> {
    return this.apiService.request('post', 'updateCurrency', currency);
  }
}
