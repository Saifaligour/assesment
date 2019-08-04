import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }


  // activate bitcoin wallet
  public activateBTC(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateBTC');
  }

  // bitcoin wallet status
  public btcWalletStatus(): Observable<any> {
    return this.apiService.externalrequest('get', 'btcWallet');
  }

  // transaction fee of sending bitcoin
  public btcTnxFee(): Observable<any> {
    return this.apiService.externalrequest('get', 'btcTransactionFee');
  }

  /**
   * getting userBitCoinBalance
   */
  public userBitCoinBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userBitcoinBalance');
  }

  /**
   * sending bitcoin to another user
   */
  public sendBitCoin(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendBitcoinToOther', amount);
  }


  // send receive Transaction
  public userBitCoinTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnBitCoin' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }

}
