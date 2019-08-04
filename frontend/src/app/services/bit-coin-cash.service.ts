import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitCoinCashService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate bch wallet
  public activateBitCoinCash(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateBitCoinCash');
  }

  // bitcoin cash wallet status
  public bchWallet(): Observable<any> {
    return this.apiService.externalrequest('get', 'bchWallet');
  }

  // getting transaction fees of bit coin cash
  public bchTnxFees(): Observable<any> {
    return this.apiService.externalrequest('get', 'bchTnxFee');
  }

  // gettin user bit coin cash balance
  public userBitCashBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userBitCashBalance');
  }

  // send bit coin cash to other user service method
  public sendBitcoincash(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendBitcoinCash', amount);
  }

  // send receive Transaction
  public userBitCashTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnBitcoinCash' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }
}
