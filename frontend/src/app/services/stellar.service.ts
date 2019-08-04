import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StellarService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate stellar wallet
  public activateStellar(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateXLM');
  }

  // steller wallet status
  public stellerWalletStatus(): Observable<any> {
    return this.apiService.externalrequest('get', 'xlmWallet');
  }

  // stellar transaction fee
  public stellarTransFee(): Observable<any> {
    return this.apiService.externalrequest('get', 'stellarTransactionFee');
  }

  // getting user stellar balance
  public stellarBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userStellarBalance');
  }

  // sending stellar to another user
  public sendStellar(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendXLMToOther', amount);
  }

  // send receive Transaction
  public userStellarTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
    ('get', 'sendReceiveTxnStellar' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }
}
