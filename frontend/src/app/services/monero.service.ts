import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneroService {

  constructor(
    private apiService: ApiService
  ) { }

  // activate monero wallet
  public activateMonero(): Observable<any> {
    return this.apiService.externalrequest('get', 'activateMonero');
  }

  // monero wallet status
  public moneroWallet(): Observable<any> {
    return this.apiService.externalrequest('get', 'moneroWallet');
  }

  // getting user monero balance
  public userMoneroBalance(): Observable<any> {
    return this.apiService.externalrequest('get', 'userMoneroBalance');
  }

  // send monero to other user
  public sendMonero(amount): Observable<any> {
    return this.apiService.externalrequest('post', 'sendMoneroToOther', amount);
  }


  // send receive Transaction
  public userMoneroTransaction(pageIndex, pageSize, search): Observable<any> {
    return this.apiService.externalrequest
      ('get', 'sendReceiveTxnMonero' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&search=' + search);
  }

}
