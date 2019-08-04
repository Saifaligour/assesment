import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate eth wallet
  public activateETH(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateETH');
  }

  // etherum wallet status
  public ethWalletStatus(): Observable<any> {
    return this.apiService.externalrequest('get', 'ethWallet');
  }

  // getting user etherum Balance
  public ethBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userEthereumBalance');
  }

  // send ETH to other user
  public sendETHToOther(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendETHToOther', amount);
  }

  // send receive Transaction
  public userEthereumTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnEthereum' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }
}
