import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LiteCoinService {

  constructor(
    private apiService: ApiService
  ) { }


  // activate bitcoin wallet
  public activateLiteCoin(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateLitecoin');
  }


  // litecoin wallet status
  public liteCoinWallet(): Observable<any> {
    return this.apiService.externalrequest('get', 'litecoinWallet');
  }

  // transaction fee lite coin
  public liteCoinNetworkFee(): Observable<any> {
    return this.apiService.externalrequest('get', 'transactionFeeLTC');
  }

  // getting user lite coin balance
  public userLTCBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userLitecoinBalance');
  }

  // send lite coin to another user
  public sendLiteCoin(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendLiteCoin', amount);
  }

  // send receive Transaction
  public userLitecoinTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnLitecoin' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }

}
