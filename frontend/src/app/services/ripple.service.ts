import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RippleService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate XRP wallet
  public activateXRP(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateXRP');
  }

  // ripple wallet status
  public rippleWalletStatus(): Observable<any> {
    return this.apiService.externalrequest('get', 'xrpWallet');
  }

  // ripple transaction fee
  public rippleFee(): Observable<any> {
    return this.apiService.externalrequest('get', 'xrpTransactionFee');
  }

  // ripple user balance
  public userXRPBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userRippleBalance');
  }

  // sending ripple to another user
  public sendRipple(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendRipple', amount);
  }

  // send receive Transaction
  public userRippleTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
    ('get', 'sendReceiveTxnRipple' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }

}
