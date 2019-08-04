import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TetherService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate tether wallet
  public activateTether(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateTether');
  }

  // tether wallet status
  public tetherWalletStatus(): Observable<any> {
    return this.apiService.externalrequest('get', 'tetherWallet');
  }


  // usdt transaction fee
  public tetherFee(): Observable<any> {
    return this.apiService.externalrequest('get', 'usdtTransactionFee');
  }

  // getting user tether balance
  public userTetherBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userTetherBalance');
  }


  // send usdt to other user
  public sendTetherToOther(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendTetherToOther', amount);
  }

  // send receive Transaction
  public userStellarTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnTether' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }
}
